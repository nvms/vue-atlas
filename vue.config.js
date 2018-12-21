module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    externals: (process.env.NODE_ENV === 'production') ? {
      moment: 'moment',
      'velocity-animate': 'velocity-animate'
    } : {}
  }
}
