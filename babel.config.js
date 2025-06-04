module.exports = {
  presets: [
   '@react-native/babel-preset'
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./Source'],
        alias: {
          '@components': './Source/Components',
          '@screens': './Source/Screens',
          '@constants': './Source/constants',
        },
      },
    ],
  ],
};

