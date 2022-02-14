module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./app'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            tests: ['./tests/'],
            '@app': './app',
            '@assets': './app/assets',
            '@components': './app/components',
            '@screens': './app/screens',
            '@styles': './app/styles',
            '@locales': './app/locales',
            '@models': './app/models',
            '@resources': './app/resources',
            '@codegen': './app/codegen'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
