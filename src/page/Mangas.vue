<template>
  <div>
    <div class="flex justify-between">
      <span>Truyện đã đăng</span>
      <el-pagination background layout="prev, pager, next" :total="(mangaStore.count / mangaStore.option.limit) * 10"
        @current-change="changeIndexViewManga" />
      <el-button-group>
        <el-button :disabled="disableRemove" type="primary">
          xoá
          <el-icon class="ml-2">
            <TrashIcon class="w-4 h-4" />
          </el-icon>
        </el-button>
        <el-dropdown trigger="click" size="medium" type="primary">
          <el-button type="primary">
            {{ mangaStore.option.limit }} hàng
            <el-icon class="ml-2">
              <ChevronDownIcon class="w-4 h-4" />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="pickViewRow(item)" v-for="item in viewRow" :key="item">{{ item }}
                hàng</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-button-group>
    </div>
    <el-table stripe border :data="mangaStore.value" class="mt-4" v-loading="loading" element-loading-text="Đang tải..."
      style="width: 100%;" table-layout="fixed">
      <el-table-column align="center" type="selection" width="38" />
      <el-table-column align="center" fixed prop="name" label="Tên" width="160"></el-table-column>
      <el-table-column align="center" prop="desc" label="Mô tả">
        <template #default="{ row }">
          <el-tooltip :hide-after="50" effect="dark" :content="row.desc" placement="right">
            <template #content>
              <div class="max-w-[320px] max-h-[150px] overflow-x-hidden overflow-y-scroll">
                {{ row.desc }}
              </div>
            </template>
            <div class="line-clamp">
              {{ row.desc }}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createAt" label="Ngày tạo">
        <template #default="{ row }">
          <div class="line-clamp">
            {{ $dayjs(row.createAt).format('HH:mm - DD/MM/YYYY') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateAt" label="Ngày cập nhật">
        <template #default="{ row }">
          <div class="line-clamp">
            {{ $dayjs(row.updateAt).format('HH:mm - DD/MM/YYYY') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="postAt" label="Phát hành">
        <template #default="{ row }">
          <div class="line-clamp">
            {{ $dayjs(row.postAt).format('HH:mm - DD/MM/YYYY') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="chapterPresent" label="Chapter hiện tại"></el-table-column>
      <el-table-column align="center" fixed="right" label="Hành động" width="160">
        <template #default="scope">
          <el-dropdown class="w-full" size="medium" trigger="click">
            <el-button class="w-full" type="primary">
              Tuỳ chọn
              <el-icon class="ml-2">
                <ChevronDownIcon class="w-4 h-4" />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item class="flex justify-between" @click="redirectToNewChapter(scope.row)">
                  <span class="mr-2">Cập nhật chapter</span>
                  <ArrowPathIcon class="w-5 h-5" />
                </el-dropdown-item>
                <el-dropdown-item class="flex justify-between" @click="redirectToListChapter(scope.row)">
                  <span class="mr-2">Danh sách chapter</span>
                  <ListBulletIcon class="w-5 h-5" />
                </el-dropdown-item>
                <el-dropdown-item @click="removeManga(scope.row)" class="bg-red-500 flex justify-between">
                  <span class="mr-2 text-slate-100">Xoá</span>
                  <TrashIcon class="w-5 h-5 text-slate-100" />
                </el-dropdown-item>
                <el-dropdown-item class="flex justify-between">
                  <span class="mr-2">Chỉnh sửa</span>
                  <PencilSquareIcon class="w-5 h-5" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
import { useRouter } from 'vue-router';
import { config } from '@/env/index';
import { EyeIcon, ChevronDownIcon, TrashIcon, ArrowPathIcon, ListBulletIcon, PencilSquareIcon } from '@heroicons/vue/24/solid'
import { useStore } from 'vuex';
// import { ElCheckbox } from 'element-plus'

// import type { FunctionalComponent } from 'vue'
import { ElMessageBox, ElNotification } from 'element-plus'

enum SortType {
  ascending = 'asc',
  descending = 'desc',
}

interface MangaTable {
  id: string,
  name: string,
  createAt?: string | undefined,
  updateAt?: string | undefined,
  [key: string]: string | undefined,
}

const router = useRouter();
const store = useStore();
const mangaStore = computed(() => store.state.mangas);
const mangas = ref();
const loading = ref<boolean>(true);
const disableRemove = ref<boolean>(true);
const viewRow = ref([5, 10, 15]);

const getMangas = async () => {
  await store.dispatch('mangas/getMangas');
  loading.value = false;
}

const pickViewRow = async (value: any) => {
  await store.dispatch('mangas/changeOption', { limit: value });
}

const redirectToNewChapter = (mangaInstance: MangaTable) => {
  router.push({ name: 'create-chapter', params: { id: mangaInstance.id }, query: { name: mangaInstance.name } });
}

const redirectToListChapter = (mangaInstance: MangaTable) => {
  router.push({ name: 'list-chapter', params: { id: mangaInstance.id }, query: { name: mangaInstance.name } });
}

const removeManga = (mangaInstance: MangaTable) => {
  ElMessageBox.confirm(
    'Bạn có chắc sẽ xoá manga này chứ?',
    'Cảnh báo',
    {
      confirmButtonText: 'Chấp nhận',
      cancelButtonText: 'Huỷ',
      type: 'warning',
    }
  )
    .then(async () => {
      const state = await store.dispatch('mangas/removeManga', { id: mangaInstance.id });
      if (state) {
        ElNotification({
          title: 'Thành công',
          message: `Manga ${mangaInstance.name} đã xoá`,
          type: 'success',
        })
      } else {
        ElNotification({
          title: 'Lỗi rồi',
          message: 'Đã xảy ra lỗi khi xoá',
          type: 'error',
        })
      }
    })
    .catch(() => {

    })
}

const handleViewDetail = () => {

  console.log('View details');
}

const changeIndexViewManga = async (value: number) => {
  loading.value = true;
  await store.dispatch('mangas/changeOption', { skip: ((value - 1) * mangaStore.value.option.limit) });
  await store.dispatch('mangas/getMangas');
  loading.value = false;
}

// run data fetching
getMangas();

</script>

<style scoped>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>