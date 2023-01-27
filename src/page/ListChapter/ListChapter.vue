<template>
  <div>
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-1 flex flex-col mt-4">
        <h4 class="text-slate-600 text-lg font-semibold flex items-center group">
          <HashtagIcon class="w-4 h-4 opacity-20 group-hover:opacity-100 transition-opacity cursor-pointer" />
          <span class="">số lượng chapter - {{
            chaptersStore?.[$route.params.id as string]?.value.length || '{trống}'
          }}</span>
        </h4>
        <div v-if="isEmpty" class="flex flex-col items-center pt-28">
          <ChapterIcon class="w-20 h-20" />
          <span class="text-slate-700 mt-3">không có chapter nào có sẵn.</span>
        </div>
        <div v-else class="">
          <!-- HEADER CHAPTER -->
          <div class="grid grid-cols-3 col-auto text-slate-600 font-semibold mt-5 uppercase mb-2">
            <span class="text-center">chapter số</span>
            <span class="text-center">ngày tạo</span>
            <span class="text-center">cập nhật</span>
          </div>
          <div ref="observerElement" class="max-h-[440px] h-[440px] overflow-x-hidden overflow-y-scroll">
            <div @click="highlightChapter(data, index)" v-if="$route.params.id as string in chaptersStore"
              :class="`grid grid-cols-3 col-auto p-3 ${index === 0 || index === chaptersStore[$route.params.id as string].value.length - 1 ? '' : 'my-2'} rounded-md ${highlightIndex === index ? 'border-blue-600' : ''} transition-colors border-[2px] border-transparent text-slate-700 shadow-md items-center cursor-pointer hover:shadow-sm transition-shadow`"
              :key="data.id" v-for="(data, index) in chaptersStore[$route.params.id as string].value">
              <span class="text-center">{{ data.number }}</span>
              <span class="text-center">{{ $dayjs(data.createdAt).format('HH:mm - DD/MM/YYYY') }}</span>
              <span class="text-center">{{ $dayjs(data.updatedAt).format('HH:mm - DD/MM/YYYY') }}</span>
            </div>
            <div ref="target" class="p-4">
              <Loading :loading="loading" textOut="hết chapter rồi!" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1 flex flex-col mt-4">
        <h4 class="text-slate-600 text-lg font-semibold flex items-center group">
          <HashtagIcon class="w-4 h-4 opacity-20 group-hover:opacity-100 transition-opacity cursor-pointer" />
          <span class="">thông tin của chapter</span>
        </h4>
        <transition :mode="'out-in'" name="fade">
          <div v-if="!pickChapter" class="flex flex-col items-center pt-28">
            <InfoIcon class="w-20 h-20" />
            <span class="text-slate-700 mt-3">dữ liệu bị trống.</span>
          </div>
          <div class="mt-4" v-else>
            <div class="border rounded-md p-5">
              <div class="text-slate-700 text-md my-1">
                <span class="font-semibold">Tên: </span>
                <span>{{ pickChapter.name || '{chưa được đặt tên.}' }}</span>
              </div>
              <div class="text-slate-700 text-md my-1">
                <span class="font-semibold">Mô tả: </span>
                <span>{{ pickChapter.desc || '{chưa có mô tả nào.}' }}</span>
              </div>
              <div class="text-slate-700 text-md my-1">
                <span class="font-semibold">Số lượng hình ảnh: </span>
                <span>{{ pickChapter.images.length || 0 }}</span>
              </div>
              <div class="text-slate-700 text-md my-1">
                <span class="font-semibold">Kích thước tổng(hình ảnh): </span>
                <span>{{ formatBytes(pickChapter.images.reduce((temp, img) => img.size + temp, 0)) || 'byte' }}</span>
              </div>
            </div>
            <div class="grid grid-cols-12 border rounded-md p-5 mt-4">
              <el-button @click="gotoRoute('edit-info', pickChapter?.id as string)" class="col-span-4" type="primary"
                :icon="PencilIcon">sửa thông
                tin</el-button>
              <el-button @click="gotoRoute('update-image', pickChapter?.id as string)" class="col-span-4" type="primary"
                :icon="ArrowPathIcon">cập
                nhật ảnh</el-button>
              <el-button class="col-span-4" type="primary" :icon="ArchiveBoxXMarkIcon">xoá chapter</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChapterIcon from '@/assets/icons/chapter.svg?component';
import InfoIcon from '@/assets/icons/info.svg?component';
import Loading from '@/components/Loading.vue';
import { HashtagIcon, PencilIcon, ArrowPathIcon, ArchiveBoxXMarkIcon } from '@heroicons/vue/24/outline';
import { MangaManage, Chapter } from '@/store/chapters';
import { formatBytes } from '@/untils/index';

import { ref, reactive, computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useIntersectionObserver } from '@vueuse/core'

const pickChapter = ref<Chapter>();
const highlightIndex = ref<number | null>(null);
const route = useRoute();
const router = useRouter();
const store = useStore();
const chaptersStore = computed<MangaManage>(() => store.state.chapters);
const target = ref(null)
const observerElement = ref(null)
const loading = ref(false);
const dateAsignment = Date.now();
const isEmpty = ref(false);

interface ParamType {
  id: string,
}

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      getChapters();
    }
  },
)

watchEffect(() => {
  if (highlightIndex.value === null && chaptersStore.value?.[route.params.id as string]?.value.length) {
    pickChapter.value = chaptersStore.value[route.params.id as string].value[0];
    highlightIndex.value = 0;
  }
})

const highlightChapter = (chapter: Chapter, index: number) => {
  highlightIndex.value = index;
  pickChapter.value = chapter;
}

const getChapters = async (idManga?: string) => {
  loading.value = true;
  const state = await store.dispatch('chapters/APIGetChapters', { id: idManga ? idManga : route.params.id });
  loading.value = false;

}

const gotoRoute = (nameRoute: string, id: string) => {
  if (id) {
    router.push({ name: nameRoute, params: { id: route.params.id, idChapter: id }, query: { name: route.query.name, number: pickChapter.value?.number || NaN } });
  }
}

</script>

<style scoped>

</style>