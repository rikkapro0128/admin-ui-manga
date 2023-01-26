<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'mangas' }">Danh sách</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.query.name }}</el-breadcrumb-item>
      <el-breadcrumb-item>danh sách chapter</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>