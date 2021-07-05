module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        data: `@import "@/assets/css/common.scss";`
      }
    }
  },
  devServer: {
    port: 80,
    disableHostCheck: true
  }
}
