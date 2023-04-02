import vuetify from 'vite-plugin-vuetify'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
// @ts-ignore
// @ts-ignore
export default defineNuxtConfig({
    ssr: false,
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Line Joiner',
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
            ],
            meta: [
                {name: 'description', content: 'Ad free website to join each line of text with a delimiter. Many lines, become one line.'},
                {name: 'author', content: 'Jonathan Law'},
                { hid: 'og-type', property: 'og:type', content: 'website' },
                { hid: 'og-title', property: 'og:title', content: 'Line Joiner' },
                { hid: 'og-desc', property: 'og:description', content: 'Ad free website to join each line of text with a delimiter. Many lines, become one line.' },
                { hid: 'og-image', property: 'og:image', content: 'https://line-joiner.netlify.app/line-joiner-logo.webp' },
                { hid: 'og-url', property: 'og:url', content: 'https://line-joiner.netlify.app/' },
            ],
        },
    },
    css: ['vuetify/styles', '@/assets/main.css'],
    vite: {
        // @ts-ignore
        // curently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
        ssr: {
            noExternal: ['vuetify'], // add the vuetify vite plugin
        }
    },
    modules: [
        // @ts-ignore
        // this adds the vuetify vite plugin
        // also produces type errors in the current beta release
        async (options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
                vuetify()
            ))
        }
    ],
    runtimeConfig: {
        public: {
            google_analytics_id: process.env.google_analytics_id,
        }
    }
})