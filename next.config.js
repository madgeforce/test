// next.config.js
const withPWA = require('next-pwa')

module.exports = withPWA({
  // your next.js config
  pwa: {
    // your pwa config
    dest: 'public',
    manifest: {
      name: 'My Next.js App',
      short_name: 'Next App',
      description: 'A PWA with Next.js',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workboxOpts: {
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'offlineCache',
            expiration: {
              maxEntries: 200
            }
          }
        }
      ]
    }
  }
})
