<template>
  <div>
    <div class="grid grid-cols-12 gap-2">
      <!-- THIS SECTION IMAGE -->
      <div class="col-span-7 grid grid-cols-12 gap-2">
        <div class="col-span-3 flex flex-col">
          <span class="mb-2 ml-2 capitalize font-semibold">avatar</span>
          <FileUpload class="flex-1 h-52" @change="avatarChange" />
        </div>
        <div class="col-span-9 flex flex-col">
          <span class="mb-2 ml-2 capitalize font-semibold">ảnh bìa</span>
          <FileUpload class="flex-1 h-52" :size="1" @change="coverChange" />
        </div>
      </div>
      <div class="col-span-5 overflow-hidden">
        <span class="ml-2 capitalize font-semibold block">mô tả</span>
        <div class="border-2 mt-2 rounded-lg">
          <textarea class="max-h-52 h-52 overflow-y-scroll border-none w-full p-2 outline-none"
            v-model="form.decription" placeholder="..." resize="none" name="decription"></textarea>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 mt-5 gap-2">
      <div class="col-span-4 flex flex-col">
        <span class="ml-2 mb-2 capitalize font-semibold">Tên truyện</span>
        <el-input v-model="form.name" placeholder="..." size="large" :suffix-icon="PencilSquareIcon" />
      </div>
      <div class="col-span-4 flex flex-col">
        <span class="ml-2 mb-2 capitalize font-semibold">Ngày đăng</span>
        <el-date-picker v-model="form.datePicker" type="date" placeholder="Chọn ngày" :disabled-date="disabledDate"
          :shortcuts="shortcuts" size="large" />
      </div>
    </div>
    <div class="flex justify-end">
      <el-button @click="submitInfo" type="primary" plain>Tải lên
        <el-icon class="el-icon--right">
          <ArrowUpTrayIcon />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElNotification } from 'element-plus'
import FileUpload from '@/components/FileUpload.vue'
import { config } from '@/env/index';
import { MagnifyingGlassIcon, ArrowDownTrayIcon, TrashIcon, PlusCircleIcon, PencilSquareIcon, ArrowUpTrayIcon } from '@heroicons/vue/20/solid';

interface FormType {
  name: string;
  decription: string;
  datePicker: any;
  avatar: File | null,
  cover: File | null,
}

interface JsonType {
  message: string,
}
interface ErrorType {
  [key: string]: string,
}

const listError: ErrorType = {
  'manga is duplicated.': 'Manga này đã có sẵn',
  'missing fields require.': 'Thông tin bị thiếu',
  'something went wrong.': 'Đã có lỗi gì đó xảy ra'
}

const form = reactive<FormType>({
  name: '',
  decription: '',
  datePicker: undefined,
  avatar: null,
  cover: null
})

const shortcuts = [
  {
    text: 'Hôm nay',
    value: new Date(),
  },
  {
    text: 'Ngày mai',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: '1 tuần',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
      return date
    },
  },
]
const disabledDate = (time: Date) => {
  return time.getTime() <= Date.now()
}

const avatarChange = (file: File | null) => {
  form.avatar = file;
}
const coverChange = (file: File | null) => {
  form.cover = file;
}

const submitInfo = async () => {
  try {
    const newForm = new FormData();
    if (form.name) { newForm.append('name', form.name); } else {
      return;
    }
    newForm.append('desc', form.decription);
    if (form.avatar) newForm.append('avatar', form.avatar);
    if (form.cover) newForm.append('cover', form.cover);
    const res = await fetch(`${config.development.baseUrl}/v1/new/manga`, {
      method: 'POST',
      body: newForm,
    });
    const json: JsonType = await res.json();
    if (json.message === 'created manga.') {
      ElNotification({
        title: 'Thành công',
        message: 'Manga đã được tạo thành công',
        type: 'success',
      })
    } else if (json.message in listError) {
      ElNotification({
        title: 'Lỗi rồi',
        message: listError[json.message],
        type: 'error',
      })
    }
  } catch (error) {
    console.log(error);
  }
}

</script>

<style scoped>

</style>