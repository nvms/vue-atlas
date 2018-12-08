module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    externals: [
      'moment',
      'velocity-animate',
      'vue'
    ]
  }
}
