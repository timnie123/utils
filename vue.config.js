// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // 输出文件目录
  outputDir: 'dist/',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-hk/),
    ],
    module: { exprContextCritical: false },
  },
  /* chainWebpack: config => {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
  }, */
  // 压缩图片
  /* chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({x
        bypassOnDebug: true,
      })
      .end();
  }, */
  productionSourceMap: false,
  // css相关配置
  css: {
    loaderOptions: {
      sass: {
        // 全局scss變量
        prependData: '@import "~@/assets/css/variables.scss";',
      },
    },
  },
  // eslint-disable-next-line global-require
  parallel: require('os').cpus().length > 1,
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // 配置自动启动浏览器
    host: '192.168.5.31',
    port: 8085, // 端口号
    https: false,
    hotOnly: false,
  },
  // 第三方插件配置
  pluginOptions: {},
};
