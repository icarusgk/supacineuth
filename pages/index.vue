<script lang="ts" setup>

</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen-md">
    <h1 class="font-bold text-5xl text-center">Bienvenidos a cinépolis</h1>
    <div class="flex my-10 gap-4">
      <button @click="$router.push('/peliculas')" class="btn btn-accent">Ver Peliculas Disponibles</button>
    </div>
  </div>
</template>

<style scoped></style>
