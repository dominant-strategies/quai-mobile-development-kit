module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [{

    plugins: ['@babel/plugin-transform-flow-strip-types', 
    ['@babel/plugin-transform-private-methods', { loose: true }]],

  }],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          crypto: 'react-native-quick-crypto',
          stream: 'stream-browserify',
          buffer: '@craftzdog/react-native-buffer',
        },
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
  ],
};
