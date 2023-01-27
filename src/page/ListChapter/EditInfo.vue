<template>
  <div class="grid grid-cols-2 gap-4 col-span-auto mt-5">
    <el-input v-model="info.name" class="h-fit" placeholder="Tên chapter | (không bắt buộc)" size="large" />
    <el-input class="mx-2" :autosize="{ minRows: 6 }" v-model="info.desc" size="large"
      placeholder="Mô tả chapter | (không bắt buộc)" type="textarea" />
    <div class="col-span-2 flex justify-end">
      <el-button size="large" type="primary">cập nhật thay đổi
        <el-icon class="ml-2">
          <ArrowPathIcon class="w-5 h-5" />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const info = reactive({
  name: '',
  desc: ''
});

</script>

<style scoped>

</style>