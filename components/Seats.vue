<script setup>
const supabase = useSupabaseClient();

const props = defineProps(["movie"]);
const movieId = props.movie.idPelicula;
let realtimeChannel;

const setting = ref(false);

const show = ref(false);

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
  setting.value = true;
  for (const seat of seats.value) {
    if (setting.value === true) {
      await supabase.from('seats').update({ busy: false }).eq('id', seat.id);
    }
  }
  
}

async function setAllSeats() {
  setting.value = true;
  for (const seat of seats.value) {
    if (setting.value === true) {
      await supabase.from('seats').update({ busy: true }).eq('id', seat.id);
    }
  }  
}

function stopSetting() {
  setting.value = false;
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
      <div class="flex justify-center mt-4">
        <button @click="show = !show" class="btn btn-accent">Mostrar opciones de admin</button>
      </div>
      <div v-if="show">
        <h1 class="text-center text-3xl font-bold my-4">Acciones admin</h1>
        <div class="flex justify-center gap-4 flex-wrap">
          <button @click="resetSeats" class="btn btn-success">Resetear asientos</button>
          <button @click="setAllSeats" class="btn btn-info">Setear asientos</button>
          <button @click="stopSetting" class="btn btn-error">Parar</button>
        </div>
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
