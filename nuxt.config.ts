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
        },
        '@kevinmarrec/nuxt-pwa'
    ],
    runtimeConfig: {
        public: {
            google_analytics_id: process.env.google_analytics_id,
        }
    },
    pwa: {
        workbox: {
            enabled: true,
        },
        meta: {
            author: 'Jonathan Law',
            description: 'Ad free website to join each line of text with a delimiter. Many lines, become one line.',
            theme_color: '#d0368a',
            ogSiteName: 'Line Joiner',
            ogTitle: 'Line Joiner',
            ogDescription: 'Ad free website to join each line of text with a delimiter. Many lines, become one line.',
            ogImage: 'https://line-joiner.netlify.app/line-joiner-logo.webp',
            ogUrl: 'https://line-joiner.netlify.app/',
            twitterCard: 'app',
            twitterSite: '@jonathanlawhh',
        },
        manifest: {
            name: 'Line Joiner',
            short_name: 'Line Joiner',
            lang: 'en',
            useWebmanifestExtension: false,
            theme_color: '#d0368a',
            display: "standalone",
        }
    }
})