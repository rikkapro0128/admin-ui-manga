<template>
  <div class="grid grid-cols-12 gap-3">
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
      <!-- Sort & Drag -->
      <div class="col-span-6" v-else>
        <div style="background: linear-gradient(0, #f1f5f9, transparent);"
          class="w-full h-12 text-center flex items-center justify-center">
          <p class="uppercase text-sm font-semibold text-slate-600">cuộn lên</p>
        </div>
        <draggable class="list-group h-80 max-h-80 overflow-y-scroll" v-bind="dragOptions" v-model="fileList"
          :componentData="dataComponent" @start="handleStartDrag" @end="dragField = false" itemKey="src"
          :move="handleMove">
          <template #item="{ element, index }">
            <div>
              <div class="bg-transparent flex items-center">
                <div class="px-5 text-xs">{{ index }}</div>
                <div class="flex-1 py-1" @click="highlightFile(index)"
                  :class="`${imageView.indexActive === index ? 'border-blue-500' : 'border-transparent'} border text-xs flex justify-between cursor-pointer bg-slate-100 px-3 rounded-sm shadow-sm active:shadow-none text-slate-800 items-center`">
                  <span class="truncate && mr-4 max-w-[190px]"> {{ element.file.name }}</span>
                  <div>
                    <span class="mr-4"> {{ formatBytes(element.file.size) }} </span>
                    <el-button :disabled="blockDrag" @click="removeByIndexFile(index)" :icon="TrashIcon"
                      circle></el-button>
                    <el-button :disabled="blockDrag" @click.stop="replaceByIndexFile(index)" :icon="PlusCircleIcon"
                      circle></el-button>
                  </div>
                </div>
              </div>
              <div @click="importByBeforeindexFile(index)"
                :style="{ 'height': imageView.indexActive === index && !blockDrag ? '40px' : 0 }"
                class="h-0 bg-transparent transition-all overflow-hidden flex justify-center items-center text-slate-600 text-sm cursor-pointer">
                <span class="mr-2 uppercase">chèn file</span>
                <PhotoIcon2 class="w-5 h-5" />
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
      <div class="col-span-6 grid grid-cols-6 text-slate-600 gap-3" v-else>
        <div
          class="h-[430px] col-span-4 flex flex-col justify-center items-center text-sm border border-slate-300 rounded-md bg-slate-50">
          <transition :mode="'out-in'" name="fade">
            <div v-if="!imageView.middle">
              <PhotoIcon class="w-14 h-14 block mx-auto" />
              <p class="uppercase">ảnh xem trước</p>
            </div>
            <div class="overflow-hidden" v-else>
              <img class="h-full object-cover" :src="imageView.middle" alt="preview-first">
            </div>
          </transition>
        </div>
        <div class="col-span-2">
          <el-space class="w-full" :fill="true" wrap direction="vertical">
            <el-button @click="blockDrag = !blockDrag" type="primary">
              {{ blockDrag? 'mở khoá': 'khoá' }}
              <el-icon class="ml-2">
                <component :is="!blockDrag ? LockOpenIcon : LockClosedIcon"></component>
              </el-icon>
            </el-button>
            <el-button @click="preview = true" type="primary">
              preview
              <el-icon class="ml-2">
                <EyeIcon class="w-5 h-5" />
              </el-icon>
            </el-button>
            <el-button @click="removeAllFile" type="primary">
              xoá tất cả
              <el-icon class="ml-2">
                <TrashIcon class="w-5 h-5" />
              </el-icon>
            </el-button>
            <el-button @click="pushFiles" type="primary">
              upload chapter
              <el-icon class="ml-2">
                <ArrowUpTrayIcon class="w-5 h-5" />
              </el-icon>
            </el-button>
          </el-space>
        </div>
      </div>
    </transition>
  </div>
  <el-drawer class="relative" :show-close="false" :withHeader="false" v-if="fileExist" size="100%" v-model="preview">
    <el-button @click="preview = false" class="absolute right-10 top-5" type="primary" :icon="XMarkIcon" circle />
    <div class="mx-auto w-1/2" :key="file.src" v-for="(file, index) in fileList">
      <img :src="file.src" :alt="`view index - ${index}`">
    </div>
  </el-drawer>
  <input ref="inputFile" class="hidden" type="file" name="replace-file"
    :accept="(parserTypeFile(props.type, 'image/') as string)" :multiple="false" @change="replaceOrImportFileChange">
</template>

<script setup lang="ts">
import FolderIcon from '@/assets/icons/box.svg?component';
import { TagIcon, PhotoIcon, LockOpenIcon, LockClosedIcon, XMarkIcon, EyeIcon, TrashIcon, ArrowUpTrayIcon, PlusCircleIcon } from '@heroicons/vue/20/solid'
import { PuzzlePieceIcon, PhotoIcon as PhotoIcon2 } from '@heroicons/vue/24/outline'
import draggable from 'vuedraggable'
import { reactive, ref } from 'vue';
import { ElMessageBox, ElNotification } from 'element-plus'

import { formatBytes } from '@/untils/index';
import { useRoute } from 'vue-router';

interface ImageView {
  middle: string,
  indexActive: null | number,
}

const route = useRoute();
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
    default: ['png', 'gif', 'jpeg'],
  },
})
const emit = defineEmits<{
  (e: 'pushFile', files: Array<any> | Array<File> | undefined): void
}>();

const cmdIncludeFile = ref();
const importBeforeIndex = ref();
const preview = ref(false);
const highlight = ref(false);
const dragField = ref(false);
const blockDrag = ref(false);
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
  middle: '',
  indexActive: null,
})

const pushFiles = () => {
  emit('pushFile', fileList.value);
}

const highlightFile = (index: number) => {
  if (fileList.value?.length && fileList.value?.[index]) {
    if (index !== imageView.indexActive) {
      imageView.indexActive = index;
      imageView.middle = fileList.value[index].src;
    } else {
      imageView.indexActive = null;
    }
  }
}

const replaceByIndexFile = (index: number) => {
  if (fileList.value?.[index]) {
    cmdIncludeFile.value = 'replace';
    inputFile.value?.click();
  }
}

const importByBeforeindexFile = (index: number) => {
  importBeforeIndex.value = index;
  cmdIncludeFile.value = 'import';
  inputFile.value?.click();
}

const replaceOrImportFileChange = (event: Event) => {
  const files = (event.currentTarget as HTMLInputElement).files;
  const file = files?.item(0);
  if (file) {
    const makeSrc = URL.createObjectURL(file);
    if (cmdIncludeFile.value === 'replace') {
      if (imageView.indexActive !== null && fileList.value?.length) {
        if (fileList.value[imageView.indexActive]) { URL.revokeObjectURL(fileList.value[imageView.indexActive].src) }
        imageView.middle = makeSrc;
        fileList.value[imageView.indexActive] = { file, src: makeSrc };
      }
    } else if (cmdIncludeFile.value === 'import') {
      if (fileList.value?.length && (typeof importBeforeIndex.value === 'number' && importBeforeIndex.value >= 0)) {
        fileList.value.splice(importBeforeIndex.value + 1, 0, { file, src: makeSrc });
      }
    }
  }
  cmdIncludeFile.value = undefined;
}

const removeByIndexFile = (index: number) => {
  if (fileList.value?.length) {
    if (fileList.value[index]) { URL.revokeObjectURL(fileList.value[index].src) }
    fileList.value?.splice(index, 1);
    const indexView = index > 0 ? fileList.value.length - 1 : index;
    if (fileList.value[indexView]) {
      imageView.indexActive = indexView;
      imageView.middle = fileList.value[indexView].src;
    } else {
      fileList.value = undefined;
      setupDefault();
    }
  }
}

const removeAllFile = async () => {
  ElMessageBox.confirm(
    'Điều này sẽ xoá toàn bộ thao tác, và hình ảnh bạn đang làm, chắc chứ?',
    'Cảnh báo',
    {
      confirmButtonText: 'Chấp nhận',
      cancelButtonText: 'Huỷ',
      type: 'warning',
    }
  ).then(() => {
    if (fileList.value?.length) {
      fileList.value.forEach((file) => {
        URL.revokeObjectURL(file.src);
      })
    }
    setupDefault();
  })
    .catch(() => { });
}

const setupDefault = () => {
  blockDrag.value = false;
  fileExist.value = false;
  preview.value = false;
  imageView.indexActive = null;
  imageView.middle = '';
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
  return !blockDrag.value;
}

const handleStartDrag = () => {
  dragField.value = true;
  imageView.indexActive = null;
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
