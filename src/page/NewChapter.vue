<template>
  <div>
    <span>Tạo chapter</span>
    <div class="mt-4 grid grid-cols-2 gap-2">
      <el-input class="col-span-1" v-model="form.name" placeholder="Tên chapter | (không bắt buộc)" size="large" />
      <div class="gap-2 items-center flex">
        <el-input class="text-center font-semibold" v-model="form.num" disabled size="large"
          input-style="text-align: center;" />
      </div>
    </div>
    <div class="mt-4">
      <FilesUpload @push-file="uploadChapter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import FilesUpload from '@/components/FilesUpload.vue';
import { ElNotification } from 'element-plus'

import { config } from '@/env/index';

const route = useRoute();
const form = reactive({
  name: '',
  num: 17,
  placeholder: `Tự động tạo chapter tiếp theo | 17`,
})

const uploadChapter = async (files: Array<any> | undefined) => {
  const idManga = route.params.id;
  if (files?.length) {
    try {
      const newForm = new FormData();
      for (let x = 0; x < files?.length; x++) {
        newForm.append('files', files[x].file);
      }
      const res = await fetch(`${config.development.baseUrl}/v1/upload/chapter?mangaId=${idManga}&numberChapter=${form.num}`, {
        method: 'POST',
        body: newForm,
      });
      const payload = await res.json();
      console.log(payload);
      if (payload?.message === 'chapter is duplicated.') {
        ElNotification({
          title: 'Không ổn',
          message: 'Chapter này có trong hệ thống.',
          type: 'warning',
        })
      } else if ((payload as Array<any>).length === files.length) {
        ElNotification({
          title: 'Thành công',
          message: 'Chapter đã được tạo thành công.',
          type: 'success',
        })
      }
    } catch (error) {
      console.log(error);
      ElNotification({
        title: 'Lỗi rồi',
        message: 'Đã xảy ra lỗi khi upload chapter.',
        type: 'error',
      })
    }
  }
}

</script>

<style lang="scss" scoped>

</style>