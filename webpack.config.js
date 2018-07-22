const path = require('path')
const webpack = require('webpack')

const __approot = __dirname // require('file-marker')('.approot')
const __src = path.resolve(__approot, 'src')
const __dist = path.resolve(__approot, 'dist')

const config = {
  target: 'node',
  devtool: 'source-map',
  externals: [
    require('webpack-node-externals')()
  ],
  entry: {
    // index: path.resolve(__src, 'index'),
    resource: path.resolve(__src, 'resource/object')
  },
  output: {
    path: __dist,
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      // {
      //   test: /\.ya?ml$/,
      //   loader: 'yml-loader',
      //   options: {
      //     multiDocument: true
      //   }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          // "eslint-loader"
        ],
      }
    ]
  }
}

module.exports = [
  config
]
