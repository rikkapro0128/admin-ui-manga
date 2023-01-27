<template>
  <div>
    <div class="mt-4">
      <FilesUpload ref="filesUpload" @push-file="uploadChapter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FilesUpload from '@/components/FilesUpload.vue';

const uploadChapter = async (files: Array<any> | undefined) => {
  console.log(files);
}

</script>

<style scoped>

</style>