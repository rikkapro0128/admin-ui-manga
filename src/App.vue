
<template>
  <el-container class="max-w-[1200px] mx-auto">
    <el-header class=" flex items-center justify-between">
      <div @click="$router.push({ name: 'mangas' })" class="cursor-pointer">
        <!-- <el-button :icon="Bars3Icon" size="large" circle link color="#fff" /> -->
        <span>Dashboard</span>
      </div>
      <el-menu mode="horizontal" :ellipsis="false" :default-active="selectMenu" @select="clickMenuItem">
        <el-menu-item class="capitalize" v-for="(item, index) in items" :key="item.text" :index="item.name">
          {{ item.text }}
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <span>Hi there!</span>
      </el-drawer>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition mode="out-in" name="fade">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive, FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'
import { useRouter } from 'vue-router'
import { QueueListIcon, ArrowUpTrayIcon, FlagIcon, SpeakerWaveIcon, NewspaperIcon } from "@heroicons/vue/24/solid"

interface MenuItem {
  text: string,
  icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}>,
  name: string,
}

const router = useRouter()
const theme = ref<string>('dark')
const drawer = ref<boolean>(false)
// const configElement = reactive({ zIndex: 3000, size: 'small' });
const items = reactive<MenuItem[]>([
  { text: 'truyện đã đăng', icon: QueueListIcon, name: 'mangas' },
  { text: 'đăng truyện', icon: ArrowUpTrayIcon, name: 'upload-manga' },
  { text: 'báo lỗi', icon: FlagIcon, name: 'report-error' },
  { text: 'phát thanh', icon: SpeakerWaveIcon, name: 'loud-speaker' },
  { text: 'bài đăng', icon: NewspaperIcon, name: 'create-post' },
]);
const selectMenu = ref<string>(items[0].name)

function changeTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const clickMenuItem = (key: string) => {
  router.push({ name: key });
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
</style>
