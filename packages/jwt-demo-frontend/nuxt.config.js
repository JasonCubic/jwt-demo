export default {
  server: {
    host: '0.0.0.0',
    port: 80,
  },
  router: {
    base: '/jwtdemo/',
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'JWT Demo',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    bodyAttrs: {
      class: 'jwtdemo-site',
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/jwtdemo/favicon.ico' },
    ],
    script: [
      { src: '/jwtdemo/ua-parser.min.js' },
      { src: '/jwtdemo/handle-specific-browsers.js' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/custom.css',
  ],

  resolutions: {
    'css-loader': '^4.3.0',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/jwt-auth.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
};
