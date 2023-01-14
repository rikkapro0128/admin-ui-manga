<template>
  <div class="grid grid-cols-12">
    <!-- THIS SECTION IMAGE -->
    <div class="col-span-7 grid grid-cols-12 h-52 gap-2">
      <FileUpload class="col-span-3" />
      <FileUpload class="col-span-9" :size="1" />
    </div>
    <div class="col-span-5 bg-green-100">
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import FileUpload from '../components/FileUpload.vue'
// import { MagnifyingGlassIcon, ArrowDownTrayIcon, TrashIcon, PlusCircleIcon } from '@heroicons/vue/20/solid';
</script>

<style scoped>

</style>