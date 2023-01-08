<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left capitalize">
            tên truyện
          </th>
          <th class="text-left capitalize">
            chapter hiện tại
          </th>
          <th class="text-left capitalize">
            ngày đăng
          </th>
          <th class="text-left capitalize">
            cập nhật
          </th>
          <th class="text-center capitalize">

          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in mangasFake" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.chapter }}</td>
          <td>{{ dayjs(new Date()).format('DD/MM/YYYY') }}</td>
          <td>{{ dayjs(new Date()).format('DD/MM/YYYY') }}</td>
          <td class="w-0">
            <div class="flex justify-between items-center -mx-1">
              <div class="mx-1">
                <v-btn prepend-icon="mdi-pencil" size="small" color="success">
                  chỉnh sửa
                </v-btn>
              </div>
              <div class="mx-1">
                <v-btn prepend-icon="mdi-update" size="small" color="warning">
                  cập nhật
                </v-btn>
              </div>
              <div class="mx-1">
                <v-btn prepend-icon="mdi-archive-remove" size="small" color="error">
                  xoá
                </v-btn>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="text-center mt-2">
      <v-pagination v-model="indexPage" :length="15" :total-visible="7"></v-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">

import { reactive, ref } from 'vue';
import * as dayjs from 'dayjs'

const mangasFake = reactive([
  {
    name: 'Frozen Yogurt',
    chapter: 159,
  },
  {
    name: 'Ice cream sandwich',
    chapter: 237,
  },
  {
    name: 'Eclair',
    chapter: 262,
  },
  {
    name: 'Cupcake',
    chapter: 305,
  },
  {
    name: 'Gingerbread',
    chapter: 356,
  },
  {
    name: 'Jelly bean',
    chapter: 375,
  },
  {
    name: 'Lollipop',
    chapter: 392,
  },
  {
    name: 'Honeycomb',
    chapter: 408,
  },
  {
    name: 'Donut',
    chapter: 452,
  },
  {
    name: 'KitKat',
    chapter: 518,
  },
],)

const indexPage = ref<number>(1);

</script>

<style scoped>

</style>