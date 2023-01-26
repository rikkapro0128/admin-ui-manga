<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'mangas' }">Danh sách</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.query.name }}</el-breadcrumb-item>
      <el-breadcrumb-item>tạo chapter</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mt-4 flex -mx-2">
      <el-input class="mx-2" input-style="height: fit-content;" v-model="form.name"
        placeholder="Tên chapter | (không bắt buộc)" />
      <div class="mx-2 items-center flex flex-nowrap h-fit">
        <span class="mr-4 flex-1 text-slate-600 whitespace-nowrap">Chapter tiếp theo sẽ là: </span>
        <el-input-number v-model="form.num" :min="form.minNum" />
      </div>
      <el-input class="mx-2" :autosize="{ minRows: 6 }" v-model="form.desc" placeholder="Mô tả | (không bắt buộc)"
        type="textarea" />
    </div>
    <div class="mt-4">
      <FilesUpload ref="filesUpload" @push-file="uploadChapter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import FilesUpload from '@/components/FilesUpload.vue';
import { ElNotification, ElMessage, ElLoading } from 'element-plus'

import { config } from '@/env/index';

const route = useRoute();
const filesUpload = ref<InstanceType<typeof FilesUpload> | null>(null)
const form = reactive({
  name: '',
  desc: '',
  num: null,
  minNum: 0,
  placeholder: '',
})

const uploadChapter = async (files: Array<any> | undefined) => {
  const idManga = route.params.id as string;
  const instanceLoading = ElLoading.service();
  instanceLoading.text.value = 'Đang tạo | chapter...';
  const payloadID = await createChapter(idManga);
  instanceLoading.text.value = 'Đã tạo | chapter...';
  if (payloadID && files?.length) {
    const newForm = new FormData();
    for (let x = 0; x < files?.length; x++) {
      newForm.append('files', files[x].file);
    }
    const res = await fetch(`${config.development.baseUrl}/v1/upload/chapter/${payloadID}`, {
      method: 'POST',
      body: newForm,
    })
    const { message } = await res.json();
    instanceLoading.close();
    if (res.ok && message === 'files uploaded.') {
      ElNotification({
        title: 'Thành công',
        message: 'Đã tạo thành công chapter',
        type: 'success',
      })
      filesUpload.value?.setupDefault();
    } else {
      ElNotification({
        title: 'Có lỗi',
        message: 'Đã có lỗi xảy ra khi upload chapter này',
        type: 'error',
      })
    }
    getPresentChapter();
  }

}

const createChapter = async (idManga: string) => {
  const res = await fetch(`${config.development.baseUrl}/v1/new/chapter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idManga,
      desc: form.desc,
      name: form.name,
      number: form.num,
    })
  })
  const { id } = await res.json();
  return id ? id : undefined;
}

const getPresentChapter = async () => {
  const idManga = route.params.id;
  const res = await fetch(`${config.development.baseUrl}/v1/get/manga/${idManga}/num-chapter-present`, {
    method: 'GET',
  });
  const { present } = await res.json();
  if (present >= 0) {
    const temp = present + 1;
    form.num = temp;
    form.minNum = temp;
    form.placeholder = `Tự động tạo chapter tiếp theo | ${temp}`;
  }
}

getPresentChapter();

</script>

<style lang="scss" scoped>

</style>