const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// process.env.NODE_ENV: base or common

let plugins = [],
  baseUrl = '/';

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/components/style/variables.scss'),
      ],
    })
}

console.log('process.env.NODE_ENV:\n', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  /* 
    plugins = [];
    baseUrl = '/shop/';
   */
} else {
  // process.env.NODE_ENV: development
}

module.exports = {
  devServer: {
    hot: true,
  },
  baseUrl,
  lintOnSave: false,
  configureWebpack: {
    plugins,
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@c': resolve('./src/components'),
        '@u': resolve('./src/utils'),
        '@s': resolve('./sourcecode'),
        // /element-ui/packages/alert
      }
    },
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
}