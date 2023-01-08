<script setup lang="ts">
import { ref, reactive } from 'vue'

const theme = ref<string>('light')
const drawer = ref<boolean>(false)
const menu = reactive([
  {
    title: 'danh sách truyện',
    icon: 'mdi-clock'
  },
  {
    title: 'updload truyện',
    icon: 'mdi-clock'
  },
])

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

</script>

<template>
  <v-app :theme="theme">
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Dashboard</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="left" temporary>
      <v-list>
        <v-list-subheader>Plain Variant</v-list-subheader>
        <v-list-item v-for="item in menu" :key="item.title" variant="plain" active-color="primary">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main></v-main>
  </v-app>
</template>

<style scoped>

</style>
