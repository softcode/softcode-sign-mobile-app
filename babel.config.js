module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env', // The correct .env file will be copied to .env dynamically
          safe: false,
          allowUndefined: false,
        },
      ],
    ],
  };
};
