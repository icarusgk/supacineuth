<script setup>
const props = defineProps(['movie']);
</script>

<template>
  <div class="flex items-center justify-between">
    <div @click="$router.push('/peliculas')" class="pointer flex items-center bg-green-300 p-2 rounded-lg my-2">
      <div class="i-mdi-arrow-left-box"/>
      <span class="ml-2">Regresar a peliculas</span>
    </div>
    <div class="font-bold text-2xl">Detalles</div>
  </div>
  <div class="flex">
    <img class="rounded-lg my-2" :src="props.movie.banner" />
  </div>
</template>

<style scoped></style>
