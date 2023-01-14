<template>
  <div @dragenter="handleOnMove" @dragleave="handleOutMove" @click="hanldeClickUploadFile"
    :class="`cursor-pointer transition-colors border-dotted border-2 rounded-lg ${ highlight ? 'border-slate-700' : 'border-slate-400' } flex justify-center items-center p-2 box-border`">
    <Teleport to="body">
      <div class="absolute"></div>
    </Teleport>
    <input ref="file" class="hidden" type="file" name="file-instance">
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
import { DocumentPlusIcon } from '@heroicons/vue/20/solid';

const highlight = ref<boolean>(false);
const file = ref<HTMLInputElement | null>(null)

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
    default: ['png'],
  }
})

const hanldeClickUploadFile = () => {
  file.value?.click();
}

const parserTypeFile = (types: Array<String>) => {
  return types.reduce((pre, val, index) => `${pre}${types.length === 1 || index === types.length || index === 0 ? '' : ', '}${val}`, '')
}

const transformSize = (size: number) => {
  return `${size}mb`
}

const handleOnMove = () => {
  console.log('in');
  highlight.value = true;
}

const handleOutMove = () => {
  console.log('out');
  highlight.value = false;
}
</script>

<style scoped>

</style>

