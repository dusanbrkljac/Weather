

// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   publicPath: '/weather/'

// })


module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/' + process.env.weather + '/'
    : '/'
}