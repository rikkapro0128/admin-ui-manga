<template>
  <div :style="{ zIndex: highlight ? 999 : 'auto' }"
    :class="`bg-white relative transition-colors border-dotted border-2 rounded-lg ${highlight ? 'border-slate-700' : 'border-slate-400'} flex justify-center items-center`">
    <Teleport to="body">
      <div v-if="highlight" class="absolute bg-black top-0 left-0 right-0 bottom-0 opacity-20"></div>
    </Teleport>
    <div v-if="linkFile" class="w-full h-full absolute">
      <img class="h-full w-full object-cover" type="image" :src="linkFile" alt="preview file">
      <el-button @click="clearImage" class="absolute right-2 top-2" :icon="XCircleIcon" circle />
    </div>
    <input v-else @dragenter="handleOnMove" @dragleave="handleOutMove" @drop="highlight = false" @change="onFileChange"
      :accept="(parserTypeFile(props.type, 'image/') as string)" ref="file" :multiple="false"
      class="w-full h-full opacity-0 absolute cursor-pointer p-2 box-border z-50" type="file" name="file-instance">
    <div class="flex flex-col items-center pointer-events-none">
      <DocumentPlusIcon class="w-6 h-6 text-slate-500" />
      <span class="text-center text-sm text-slate-600">Tải lên hoặc kéo thả file vào đây</span>
      <span class="text-center text-xs text-slate-600 italic">{{ transformSize(props.size) }} | {{
        parserTypeFile(props.type)
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DocumentPlusIcon, XCircleIcon } from '@heroicons/vue/20/solid';

const highlight = ref<boolean>(false);
const file = ref<HTMLInputElement | null>(null)
const pickFile = ref<File>();
const linkFile = ref<string>('')

const emit = defineEmits<{
  (e: 'change', file: File | null): void
}>();

const props = defineProps({
  size: {
    type: Number,
    default: 0.5,
    validator(raw: number) {
      return raw > 0.2 && raw < 2
    },
  },
  type: {
    type: Array<String>,
    default: ['png', 'gif'],
  }
})

const onFileChange = (event: Event) => {
  const listFile = (<HTMLInputElement>event.target).files;
  if (listFile?.length) {
    pickFile.value = listFile[0];
    linkFile.value = URL.createObjectURL(listFile[0]);
    emit('change', listFile[0]);
  }
}

const clearImage = () => {
  if (linkFile.value) {
    URL.revokeObjectURL(linkFile.value); pickFile.value = undefined; file.value = null; linkFile.value = "";
    emit('change', null);
  }
}

const parserTypeFile = (types: Array<String>, prefix: string = '') => {
  return types.reduce((pre, val, index) => `${pre}${types.length === 1 || index === types.length || index === 0 ? '' : ', '}${prefix}${val}`, '')
}

const transformSize = (size: number) => {
  return `${size}mb`
}

const handleOnMove = () => {
  highlight.value = true;
}

const handleOutMove = () => {
  highlight.value = false;
}
</script>

<style scoped>

</style>

