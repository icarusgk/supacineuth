<script setup>
const supabase = useSupabaseClient();
const router = useRouter();

const movieId = useRoute().params.id;

const { data: movie } = await useAsyncData('movieTitle', async () => {
  const { data } = await supabase.from('peliculas').select().eq('idPelicula', movieId);
  return data[0];
});

const TOTAL_MOVIES = 6;
const DUMMY_MOVIE = 4;
const MISSING_MOVIE = 2;
function goBack() {
  let prevPage = Number(movieId) - 1;
  if (prevPage === 0) return;
  if (prevPage === MISSING_MOVIE) prevPage--;
  router.push(`/asientos/${prevPage === DUMMY_MOVIE ? prevPage - 1: prevPage}`)
}

function goNext() {
  let nextPage = Number(movieId) + 1;
  if (nextPage === TOTAL_MOVIES + 1) return;
  if (nextPage === MISSING_MOVIE) nextPage++;
  router.push(`/asientos/${nextPage === DUMMY_MOVIE ? nextPage + 1: nextPage}`)
}
function handleKeydown(e) {
  if (e.keyCode === 37) goBack();
  if (e.keyCode === 39) goNext();
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown, null);
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
})
</script>

<template>
  <div class="mt-8">
    <div class="flex justify-between mx-6 mb-6">
      <button @click="goBack" class="btn btn-accent text-white">Prev</button>
      <button @click="goNext" class="btn btn-accent text-white">Next</button>
    </div>
    <h1 @click="$router.push(`/peliculas/${movie.idPelicula}`)" class="text-center font-bold text-4xl pointer">{{ movie.nombre }}</h1>
    <Seats :movie="movie" />
  </div>
</template>