<script setup>
const supabase = useSupabaseClient();
const DUMMY_MOVIE = 4;

const { data: movies } = await useAsyncData('movies', async () => {
  const { data } = await supabase.from('peliculas').select().neq('idPelicula', DUMMY_MOVIE);
  return data;
});
</script>

<template>
  <h1 class="text-center font-bold text-3xl my-6 text-dark-200 lg:text-7xl">Peliculas Disponibles</h1>
  <div class="flex flex-wrap justify-center gap-4">
    <div v-for="movie in movies" :key="movie.idPelicula">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            :src="movie.banner"
            :alt="'Banner of' + movie.nombre"
          />
        </figure>
        <div class="card-body">
          <h3 class="font-bold card-title"> {{ movie.nombre }} </h3>
          <p>{{ movie.synopsis }}</p>
          <div class="card-actions justify-end mt-5">
            <button @click="$router.push(`/peliculas/${movie.idPelicula}`)" class="btn btn-accent">Ver mas detalles</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

