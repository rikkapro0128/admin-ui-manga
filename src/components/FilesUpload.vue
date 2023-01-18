<template>
  <div class="grid grid-cols-2 gap-2">
    <Teleport to="body">
      <div v-if="highlight" class="absolute bg-black top-0 left-0 right-0 bottom-0 opacity-20"></div>
    </Teleport>
    <div class="relative bg-white rounded-lg" :style="{ zIndex: highlight ? 999 : 'auto' }">
      <input @dragenter="handleOnMove" @dragleave="handleOutMove" @drop="highlight = false" @change="onFileChange"
        :accept="(parserTypeFile(props.type, 'image/') as string)" ref="file" :multiple="true"
        class="w-full h-full opacity-0 absolute cursor-pointer p-2 box-border z-50" type="file" name="file-instance">
      <div
        class="col-span-1 flex flex-col items-center justify-center min-h-[140px] border-2 border-dotted rounded-lg cursor-pointer">
        <FolderIcon width="50" height="50" />
        <span class="text-sm italic mt-2">chưa có file | bạn có thể tải lên hoặc kéo tất cả chúng vào đây.</span>
      </div>
    </div>
    <div class="col-span-1">
      <span class="text-slate-600 font-bold underline">Chú ý:</span>
      <div class="mt-2">
        <div v-for="note in notes" :key="note" class="flex text-slate-600">
          <TagIcon class="w-5 h-5" />
          <span class="ml-2">{{ note }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FolderIcon from '@/assets/icons/box.svg?component';
import { TagIcon } from '@heroicons/vue/20/solid'
import { reactive, ref } from 'vue';


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

const highlight = ref(false);
const notes = reactive([
  'Khi tải nhiều file bạn nên sắp xếp chúng lại để khi hiển thị, chapter sẽ hiển thị đúng thứ tự ảnh.',
  'Khi có nhiều file bạn nên đánh số thứ tự mỗi file vd: 1, 2, 3,.. như vậy thì việc sắp sếp sẽ nhanh hơn.'
])

const onFileChange = (event: Event) => {
  const files = (event.currentTarget as HTMLInputElement).files;
  console.log(files);

}

const parserTypeFile = (types: Array<String>, prefix: string = '') => {
  return types.reduce((pre, val, index) => `${pre}${types.length === 1 || index === types.length || index === 0 ? '' : ', '}${prefix}${val}`, '')
}

const handleOnMove = () => {
  highlight.value = true;
}

const handleOutMove = () => {
  highlight.value = false;
}
</script>
