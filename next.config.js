const withSass = require('@zeit/next-sass');
const withOffline = require('next-offline');

module.exports = withOffline(
  withSass({
    webpack: config => {
      // Fixes npm packages that depend on `fs` module
      (config.node = {
        fs: 'empty',
      }),
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        });

      return config;
    },
    transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
    workboxOpts: {
      swDest: 'service-worker.js',
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'https-calls',
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  })
);
