import VueGtag from 'vue-gtag'
export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    if(config.public.google_analytics_id) {
        nuxtApp.vueApp.use(VueGtag, {
            config: {
                id: config.public.google_analytics_id,
            }
        })
    }
})
