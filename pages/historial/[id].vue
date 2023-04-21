<script setup>
const supabase = useSupabaseClient();
const idCompra = useRoute().params.id;

const { data: historial } = await useAsyncData('historialUnico', async () => {
  const { data } = await supabase.from('historial').select().eq('idCompra', idCompra);
  return data[0];
});
</script>

<template>
  <div>
    <div class="flex items-center ml-7 mt-8">
      <div class="i-mdi-receipt-text scale-300 mr-6"></div>
      <span class="font-bold text-4xl">Recibo</span>
    </div>
    <div class="container px-14 py-7">
      <HistoryItem title="Descripcion" :content="historial.descripcion.replace(/,\s*$/, '.').replace(/Usted seleccionó ,/g, '')" />
      <HistoryItem title="Fecha" :content="historial.fecha" />
      <HistoryItem title="Total" :content="historial.total" />
      <HistoryItem title="Lugar" :content="historial.lugar" />
      <HistoryItem title="Correo Comprador" :content="historial.correoComprador" />
      <HistoryItem title="Tarjeta" :content="historial.tarjeta" />
    </div>
    <div class="flex justify-center">
      <button @click="$router.push(`/peliculas/${historial.idPelicula}`)" class="btn btn-accent text-white">Ver Informacion de la Pelicula</button>
    </div>
  </div>
</template>

<style scoped></style>
