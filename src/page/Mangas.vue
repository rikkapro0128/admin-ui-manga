<template>
  <div>
    <div class="flex justify-between">
      <span>Truyện đã đăng</span>
      <el-pagination background layout="prev, pager, next" :total="(mangaStore.count / mangaStore.option.limit) * 10"
        @current-change="changeIndexViewManga" />
      <!-- <el-button-group class="ml-4"> -->
      <el-dropdown size="medium" split-button type="primary">
        {{ mangaStore.option.limit }} hàng
        <el-icon class="ml-1">
          <EyeIcon />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="pickViewRow(item)" v-for="item in viewRow" :key="item">{{ item }}
              hàng</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- </el-button-group> -->
    </div>
    <el-table stripe border :data="mangas" class="mt-4" v-loading="loading" element-loading-text="Đang tải..."
      style="width: 100%;" table-layout="fixed">
      <el-table-column type="selection" width="38" />
      <el-table-column fixed prop="name" label="Tên" width="160"></el-table-column>
      <el-table-column prop="desc" label="Mô tả"></el-table-column>
      <el-table-column prop="createAt" label="Ngày tạo"></el-table-column>
      <el-table-column prop="updateAt" label="Ngày cập nhật"></el-table-column>
      <el-table-column fixed="right" label="Hành động" width="160">
        <template #default>
          <el-button link type="primary" size="small" @click="handleViewDetail">Chi tiết</el-button>
          <el-button link type="primary" size="small">Chỉnh sửa</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <div>
          Không có manga nào
        </div>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="tsx">

import { reactive, ref, computed } from 'vue';
import { config } from '@/env/index';
import { EyeIcon } from '@heroicons/vue/24/solid'
import { useStore, mapState } from 'vuex';
// import { ElCheckbox } from 'element-plus'

// import type { FunctionalComponent } from 'vue'
// import type { CheckboxValueType, Column } from 'element-plus'

const parserKey = {
  id: 'id',
  name: 'name',
  desc: 'desc',
  createdAt: 'createAt',
  updatedAt: 'updateAt',
}

enum SortType {
  ascending = 'asc',
  descending = 'desc',
}

interface QueryOptions {
  limit: number,
  skip: number,
  sort?: SortType,
}

interface RawMangaResponse {
  id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
}

interface MangaTable {
  id?: string | undefined,
  name: string,
  createAt?: string | undefined,
  updateAt?: string | undefined,
  [key: string]: string | undefined,
}

const store = useStore();
const mangaStore = computed(() => store.state.mangas);
const mangas = ref();
const loading = ref<boolean>(true);
const viewRow = ref([5, 10, 15]);

const getMangas = async () => {
  mangas.value = await store.dispatch('mangas/getMangas');
  loading.value = false;
}

const pickViewRow = async (value: any) => {
  await store.dispatch('mangas/changeOption', { limit: value });
}

const handleViewDetail = () => {
  console.log('View details');
}

const changeIndexViewManga = async (value: number) => {
  loading.value = true;
  await store.dispatch('mangas/changeOption', { skip: ((value - 1) * mangaStore.value.option.limit) });
  mangas.value = await store.dispatch('mangas/getMangas');
  loading.value = false;
}

// run data fetching
getMangas();

</script>

<style scoped>

</style>