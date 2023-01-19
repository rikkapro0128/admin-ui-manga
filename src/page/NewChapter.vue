<template>
  <div>
    <span>Tạo chapter</span>
    <div class="mt-4 grid grid-cols-2 gap-2">
      <el-input class="col-span-1" v-model="form.name" placeholder="Tên chapter | (không bắt buộc)" size="large" />
      <div class="gap-2 items-center">
        <el-input class="text-center font-semibold" v-model="form.num" disabled size="large"
          input-style="text-align: center;" />
      </div>
    </div>
    <div class="mt-4">
      <FilesUpload />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import FilesUpload from '@/components/FilesUpload.vue';

const form = reactive({
  name: '',
  num: `Tự động tạo chapter tiếp theo | 17`,
})

</script>

<style lang="scss" scoped>

</style>