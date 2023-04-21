<script setup>
import Seats from '~/components/Seats.vue';
import MovieInfo from '~/components/MovieInfo.vue';

const supabase = useSupabaseClient();
const movieId = useRoute().params.id;

const tab = shallowRef(Seats);

const { data: movie } = await useAsyncData('mainMovies', async () => {
  const { data } = await supabase.from('peliculas').select().eq('idPelicula', movieId);
  return data[0];
});
</script>

<template>
  <div class="flex flex-col m-4">
    <Movie :movie="movie" />
    <div class="flex justify-center gap-3 mt-4">
      <button @click="tab = Seats" class="btn">Asientos</button>
      <button @click="tab = MovieInfo" class="btn btn-info">Info</button>
    </div>
    <KeepAlive>
      <component :is="tab" :movie="movie" :name="'roger'" />
    </KeepAlive>
  </div>
</template>

<style scoped></style>
