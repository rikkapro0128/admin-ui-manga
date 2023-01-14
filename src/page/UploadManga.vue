<template>
  <div class="grid grid-cols-12 gap-2 h-52">
    <!-- THIS SECTION IMAGE -->
    <div class="col-span-7 grid grid-cols-12 gap-2">
      <FileUpload class="col-span-3" />
      <FileUpload class="col-span-9" :size="1" />
    </div>
    <div class="col-span-5 bg-green-100 max-h-full overflow-y-scroll">
      <el-input class="max-h-full" v-model="decription" placeholder="Please input" type="textarea"
        :autosize="{ minRows: 10 }" resize="none" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import FileUpload from '@/components/FileUpload.vue'
// import { MagnifyingGlassIcon, ArrowDownTrayIcon, TrashIcon, PlusCircleIcon } from '@heroicons/vue/20/solid';

const decription = ref<string>('');
</script>

<style scoped>

</style>