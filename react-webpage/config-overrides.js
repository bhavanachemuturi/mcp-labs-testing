const path = require('path');

module.exports = function override(config) {
  config.resolve = config.resolve || {};
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    '@carbon/react/icons$': path.resolve(
      __dirname,
      'node_modules/@carbon/react/icons/index.esm.js'
    ),
  };

  return config;
};

// Made with Bob
