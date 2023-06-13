const withPWA = require('next-pwa')({
  dest: 'public',
  // your pwa config
  swDest: 'sw.js', // specify the destination of the service worker file
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
})

module.exports = withPWA({
  // your next.js config
})
