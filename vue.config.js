module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/weather/'
    : '/'
}

// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
