<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'mangas' }">Danh sách</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.query.name }}</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ name: 'list-chapter', params: { id: $route.params.id }, query: { name: $route.query.name } }">danh sách
          chapter</el-breadcrumb-item>
        <template v-if="$route.name === 'edit-info'">
          <el-breadcrumb-item>chapter {{ $route.query.number || NaN }}</el-breadcrumb-item>
          <el-breadcrumb-item>chỉnh sửa thông tin</el-breadcrumb-item>
        </template>
        <template v-if="$route.name === 'update-image'">
          <el-breadcrumb-item>chapter {{ $route.query.number || NaN }}</el-breadcrumb-item>
          <el-breadcrumb-item>cập nhật hình ảnh</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" name="fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>