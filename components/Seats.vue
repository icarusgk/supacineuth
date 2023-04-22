<script setup>
const supabase = useSupabaseClient();

const props = defineProps(["movie"]);
const movieId = props.movie.idPelicula;
let realtimeChannel;

const { data: seats } = await useAsyncData('seats', async () => {
  const { data } = await supabase
    .from("seats")
    .select()
    .order("id", { ascending: true })
    .eq("id_pelicula", movieId);
  return data;
});

async function saveSeat(seat) {
  await supabase
    .from("seats")
    .update({ busy: !seat.busy })
    .eq("id", seat.id);
}

async function resetSeats() {
  for (const seat of seats.value) {
    await supabase.from('seats').update({ busy: false }).eq('id', seat.id);
  }
}

async function setAllSeats() {
  for (const seat of seats.value) {
    await supabase.from('seats').update({ busy: true }).eq('id', seat.id);
  }
}

onMounted(() => {
  realtimeChannel = supabase
  .channel("any")
  .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "seats" },
    (payload) => {
      const seatId = payload.old.id;
      const seat = seats.value.find((seat) => seat.id === seatId);
      seat.busy = payload.new.busy;
    }
  )
  realtimeChannel.subscribe();
})
onUnmounted(() => { 
  supabase.removeChannel(realtimeChannel);
})
</script>

<template>
  <div class="flex justify-center my-5 md:mx-40 lg:mx-80 xl:mx-100">
    <div class="w-100">
      <div class="text-center">
        <p class="font-bold text-2xl">Asientos para la pelicula</p>
      </div>
      <div class="grid grid-cols-5 gap-5 p-5">
        <div
          @click="saveSeat(seat)"
          :class="{ busy: seat.busy }"
          class="bg-green-400 p-0.75 text-center cursor-pointer rounded-lg transition-all"
          v-for="seat in seats"
          :key="seat.id"
        >
          <div :class="seat.busy ? 'i-mdi:do-not-disturb' : 'i-mdi-seat' "/>
          <div>{{ seat.id }}</div>
        </div>
      </div>
      <div class="flex justify-center gap-4">
        <button @click="resetSeats" class="btn btn-success">Resetear asientos</button>
        <button @click="setAllSeats" class="btn btn-info">Setear asientos</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.busy {
  background-color: rgb(44, 44, 44);
  color: white
}
</style>
