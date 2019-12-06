module.exports = {
  configureWebpack: {
    externals: (process.env.NODE_ENV === 'production') ? {
      moment: 'moment',
      'velocity-animate': 'velocity-animate'
    } : {}
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/variables.scss";`
      }
    }
  }
}
