<template>
  <div :class="`surface flex items-center ${props.center ? 'justify-center' : ''} text-slate-700`">
    <span class="block text">{{ loading? props.textLoading : props.textOut }}</span>
    <div
      :class="`${props.loading ? 'block' : 'hidden'} circle w-[20px] h-[20px] rounded-full border-[2px] border-blue-500 ml-2 border-t-transparent`">
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  textLoading: {
    type: String,
    default: 'đang tải',
  },
  textOut: {
    type: String,
    default: 'hết dữ liệu',
  },
  center: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="css" scoped>
.circle {
  animation: wave 500ms linear infinite forwards;
}

@keyframes wave {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>