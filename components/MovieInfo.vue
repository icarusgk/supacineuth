<script lang="ts" setup>
const props = defineProps(['movie'])
const videoUrl = computed(() => props.movie.video.replace("watch?v=", "embed/"));
</script>

<template>
  <div class="my-3">
    <div class="text-center">
      <div class="flex items-center justify-center my-4">
        <div class="i-mdi-google-maps scale-120 mr-2" />
        <div>{{ movie.location }}</div>
      </div>
      <div class="font-bold">{{ movie.anio }} | {{ movie.clasificacion }} | {{ movie.duracion }}</div>
      <div>
        Genero: {{ movie.genero }}
      </div>
    </div>
    <div class="my-6">
      <h1 class="text-3xl font-bold my-4 text-center">Synopsis</h1>
      <p>{{ movie.synopsis }}</p>
    </div>
    <div class="flex flex-col justify-center">
      <h1 class="font-bold text-3xl text-center">Mira el trailer</h1>
      <div class="flex justify-center">
        <iframe width="300" height="315" class="mt-4 block text-center" :src="videoUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture;" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
