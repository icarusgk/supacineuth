<script lang="ts" setup></script>

<template>
  <div>
    <div class="sticky z-10 w-full bg-blue-800 top-0 h-22 flex justify-center items-center text-white font-extrabold text-3xl shadow shadow-dark-50">
      <div @click="$router.push('/peliculas')" class="flex items-center pointer">
        <div class="i-mdi-movie-open mr-2"></div>
        <div>cinépolis</div>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
