// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'

// Utilities
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url'

// console.log('vite base-->',import.meta.env.VITE_BASE);
// console.log('vite base-->',import.meta.env);
// https://vitejs.dev/config/
export default ({ mode }) => {
  // https://stackoverflow.com/questions/66389043/how-can-i-use-vite-env-variables-in-vite-config-js
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };


  return defineConfig({

    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
      }),
      //https://vite-pwa-org.netlify.app/guide/
      VitePWA({

        // Cuando injectamos un service worker manual
        // https://vite-pwa-org.netlify.app/guide/inject-manifest.html
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },

        // injectRegister: null,
        injectRegister: 'auto',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          // globPatterns:  ["**\/*.{js,css,html}"],
          globFollow: true, //default -
          globIgnores: ["**\/node_modules\/**\/*"], //default  -carpeta ignorada
          globStrict: true, //default
          templatedURLs: {},
          // navigateFallbackDenylist: [/^\/backoffice/], //Excluir rutas
          // Alguna estretegia para la api
          runtimeCaching: [
            // {
            //   urlPattern: ['**/*.{js,css,html,ico,png,svg}'],
            //   // urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            //   handler: 'CacheFirst',
            //   options: {
            //     cacheName: 'google-fonts-cache',
            //     expiration: {
            //       maxEntries: 10,
            //       maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            //     },
            //     cacheableResponse: {
            //       statuses: [0, 200]
            //     }
            //   }
            // },
          ]
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          // scope: '/pwasistencias/home/s',
          scope: process.env.VITE_BASE_DIR,
          name: 'Asisencias',
          short_name: 'Asistencias',
          description: 'PWA Asisencias',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: "standalone",
          // start_url: "/",
          start_url: process.env.VITE_BASE_DIR,
          icons: [
            {
              src: 'img/icons/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            // {
            //   src: 'img/icons/android-chrome-256x256.png',
            //   sizes: '256x256',
            //   type: 'image/png'
            // },
            // {
            //   src: 'img/icons/android-chrome-384x384.png',
            //   sizes: '384x384',
            //   type: 'image/png'
            // },
            {
              src: 'img/icons/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },

          ]
        },

      })
    ],
    // base: '/pwasistencias/home/',
    base: process.env.VITE_BASE_DIR,
    define: { 'process.env': {} },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    },
    server: {
      port: 3000,
    },
  });
}
