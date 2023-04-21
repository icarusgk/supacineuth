<script setup>
const props = defineProps(['title', 'content'])
</script>

<template>
  <div class="mb-5">
    <span class="font-bold text-2xl">{{ title }}</span>
    <hr>
    <p class="text-lg">{{ content }}</p>
  </div>
</template>