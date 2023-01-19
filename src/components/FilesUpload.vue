<template>
  <div class="grid grid-cols-12 gap-2">
    <Teleport to="body">
      <div v-if="highlight" class="absolute bg-black top-0 left-0 right-0 bottom-0 opacity-20"></div>
    </Teleport>
    <transition :mode="'out-in'" name="fade">
      <div v-if="!fileExist" class="col-span-6 relative bg-white rounded-lg"
        :style="{ zIndex: highlight ? 999 : 'auto' }">
        <input @dragenter="handleOnMove" @dragleave="handleOutMove" @drop="highlight = false" @change="onFileChange"
          :accept="(parserTypeFile(props.type, 'image/') as string)" ref="file" :multiple="true"
          class="w-full h-full opacity-0 absolute cursor-pointer p-2 box-border z-50" type="file" name="file-instance">
        <div
          class="p-5 flex flex-col items-center justify-center min-h-[140px] border-2 border-dotted rounded-lg cursor-pointer">
          <FolderIcon width="50" height="50" />
          <span class="text-sm italic mt-2">chưa có file | bạn có thể tải lên hoặc kéo tất cả chúng vào đây.</span>
        </div>
      </div>
      <div class="col-span-3" v-else>
        <div style="background: linear-gradient(0, #f1f5f9, transparent);"
          class="w-full h-12 text-center flex items-center justify-center">
          <p class="uppercase text-sm font-semibold text-slate-600">cuộn lên</p>
        </div>
        <draggable class="list-group h-80 max-h-80 overflow-y-scroll" v-bind="dragOptions" v-model="fileList"
          :componentData="dataComponent" @start="dragField = true" @end="dragField = false" itemKey="name"
          :move="handleMove">
          <template #item="{ element, index }">
            <div class="py-1 bg-transparent">
              <div @click="highlightFile(index)"
                :class="`${imageView.indexActive === index ? 'border-blue-500' : 'border-transparent'} border text-xs flex justify-between cursor-pointer bg-slate-100 py-2 px-3 rounded-sm shadow-sm active:shadow-none text-slate-800`">
                <span class="truncate max-w-[190px]"> {{ element.file.name }}</span>
                <span> {{ formatBytes(element.file.size) }} </span>
              </div>
            </div>
          </template>
        </draggable>
        <div style="background: linear-gradient(0, transparent, #f1f5f9);"
          class="w-full h-12 bg-blue-400 flex items-center justify-center">
          <p class="uppercase text-sm font-semibold text-slate-600">cuộn xuống</p>
        </div>
      </div>
    </transition>
    <transition :mode="'out-in'" name="fade">
      <div class="col-span-6" v-if="!fileExist">
        <span class="text-slate-600 font-bold underline">Chú ý:</span>
        <div class="mt-2">
          <div v-for="note in notes" :key="note" class="flex text-slate-600">
            <TagIcon class="w-5 h-5" />
            <span class="ml-2 text-sm">{{ note }}</span>
          </div>
        </div>
      </div>
      <div class="col-span-9 grid grid-cols-3 text-slate-600 gap-3" v-else>
        <div
          class="col-auto flex flex-col justify-center items-center text-sm border border-slate-300 rounded-md bg-slate-50">
          <transition :mode="'out-in'" name="fade">
            <div v-if="!imageView.first">
              <PhotoIcon class="w-14 h-14 block mx-auto" />
              <p class="uppercase">ảnh đằng trước</p>
            </div>
            <div class="h-full" v-else>
              <img class="h-full object-cover" :src="imageView.first" alt="preview-first">
            </div>
          </transition>
        </div>
        <div
          class="col-auto flex flex-col justify-center items-center text-sm border border-slate-300 rounded-md bg-slate-50">
          <transition :mode="'out-in'" name="fade">
            <div v-if="!imageView.middle">
              <PhotoIcon class="w-14 h-14 block mx-auto" />
              <p class="uppercase">ảnh được kéo thả</p>
            </div>
            <div class="h-full" v-else>
              <img class="h-full object-cover" :src="imageView.middle" alt="preview-first">
            </div>
          </transition>
        </div>
        <div
          class="col-auto flex flex-col justify-center items-center text-sm border border-slate-300 rounded-md bg-slate-50">
          <transition :mode="'out-in'" name="fade">
            <div v-if="!imageView.last">
              <PhotoIcon class="w-14 h-14 block mx-auto" />
              <p class="uppercase">ảnh đằng sau</p>
            </div>
            <div class="h-full" v-else>
              <img class="h-full object-cover" :src="imageView.last" alt="preview-first">
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import FolderIcon from '@/assets/icons/box.svg?component';
import { TagIcon, PhotoIcon } from '@heroicons/vue/20/solid'
import draggable from 'vuedraggable'
import { reactive, ref } from 'vue';

import { formatBytes } from '@/untils/index';

interface ImageView {
  first: string,
  middle: string,
  last: string,
  indexActive: null | number,
}

const inputFile = ref<HTMLInputElement>();

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
const dragField = ref(false);
const dragOptions = {
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "ghost"
}
const dataComponent = {
  tag: 'div',
  type: 'transition-group',
  name: !dragField ? 'flip-list' : null
};
const fileExist = ref<boolean>(false);
const fileList = ref<Array<any> | undefined>();
const notes = reactive([
  'Khi tải nhiều file bạn nên sắp xếp chúng lại để khi hiển thị, chapter sẽ hiển thị đúng thứ tự ảnh.',
  'Khi có nhiều file bạn nên đánh số thứ tự mỗi file vd: 1, 2, 3,.. như vậy thì việc sắp sếp sẽ nhanh hơn.'
])
const imageView = reactive<ImageView>({
  first: '',
  middle: '',
  last: '',
  indexActive: null,
})

const highlightFile = (index: number) => {
  if (fileList.value?.length) {
    imageView.indexActive = index;
    imageView.first = index > 0 ? fileList.value[index - 1].src : '';
    imageView.middle = fileList.value[index].src;
    imageView.last = (index !== fileList.value.length - 1) ? fileList.value[index + 1].src : '';
  }
}

const onFileChange = (event: Event) => {
  const files = (event.currentTarget as HTMLInputElement).files;
  if (files?.length) {
    fileExist.value = true
    fileList.value = Array.from(files).map(file => ({ file, src: URL.createObjectURL(file) }));
  }
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

const handleMove = (evt: any) => {
  if (fileList.value?.length) {
    const indexFuture: number = evt.draggedContext.futureIndex;
    const indexPresent: number = evt.draggedContext.index;
    imageView.first = indexFuture > 0 ? fileList.value[indexFuture - 1].src : '';
    imageView.middle = fileList.value[indexPresent].src;
    imageView.last = (indexFuture !== fileList.value.length - 1) ? fileList.value[indexFuture + 1].src : '';
  }
  // console.log(indexFuture);
}
</script>

<style scoped>
.capitalize {
  text-transform: capitalize !important;
  text-align: left;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* transition */

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
