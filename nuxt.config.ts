// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/supabase'
  ],
  css: ['@unocss/reset/tailwind.css'],
})
