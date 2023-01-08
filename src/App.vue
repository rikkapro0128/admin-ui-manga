<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

interface MenuItem {
  text: string,
  icon: string,
  name: string,
}
const router = useRouter()

const theme = ref<string>('dark')
const drawer = ref<boolean>(false)
const items = reactive<MenuItem[]>([
  { text: 'truyện đã đăng', icon: 'mdi-clipboard-text-clock-outline', name: 'mangas' },
  { text: 'đăng truyện', icon: 'mdi-file-upload', name: 'upload-manga' },
  { text: 'báo lỗi', icon: 'mdi-alert-circle-outline', name: 'report-error' },
  { text: 'loa phát thanh', icon: 'mdi-bullhorn-outline', name: 'loud-speaker' },
  { text: 'tạo bài đăng', icon: 'mdi-post-outline', name: 'create-post' },
]);

function changeTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const clickMenuItem = (payload: MenuItem) => {
  router.push({ name: payload.name });
}

</script>

<template>
  <v-app :theme="theme" class="w-full">
    <!-- THIS APP BAR -->
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="flex">Dashboard</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn @click="changeTheme" :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'">
        Button
      </v-btn>
    </v-app-bar>
    <!-- THIS DRAWER -->
    <v-navigation-drawer v-model="drawer" location="left" temporary>
      <v-list density="compact">
        <v-list-item v-for="(item, i) in items" :key="i" :value="item" @click="clickMenuItem(item)"
          active-color="primary">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title class="capitalize" v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block append-icon="mdi-logout-variant">
            đăng xuất
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- THIS MAIN CONTENT -->
    <v-main>
      <v-container fluid>
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="fade">
            <component class="" :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.capitalize {
  text-transform: capitalize !important;
  text-align: left;
}
</style>
