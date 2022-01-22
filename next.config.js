if (!isServer) {
  config.plugins.push(
    new webpack.IgnorePlugin({
      resourceRegExp: /mapbox$/,
    }),
  );
}

module.exports = {
  reactStrictMode: true,
  target: `experimental-serverless-trace`,
  images: {
    domains: ['dl.airtable.com']
  },
  swcMinify: true,
}

