module.exports = function override(config, env) {
    // do stuff with the webpack config...
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "http": require.resolve("stream-http")
    };
    return config;
  };
  