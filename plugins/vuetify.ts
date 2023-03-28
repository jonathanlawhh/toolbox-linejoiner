// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            }
        },
        theme: {
            themes: {
                light: {
                    dark: false,
                    colors: {
                        primary: '#d0368a',
                        secondary: '#708ad4',
                    }
                },
            },
        },
    })

    nuxtApp.vueApp.use(vuetify)
})