module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'nodule:react-native-dotenv',
        {
          moduleName: '@env',
          path: './env'
        }
      ]
    ]
  }
}
