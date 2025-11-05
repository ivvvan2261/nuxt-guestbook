export default defineNuxtConfig({
  compatibilityDate: '2024-11-05',
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/',
      exclude: ['/'],
    },
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
});
