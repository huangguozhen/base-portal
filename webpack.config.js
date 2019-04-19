const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/bootstrap.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'portal.js'
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  resolve: {
    modules: [ __dirname, 'node_modules' ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { Source: false }
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'public/index.html')},
      { from: path.resolve(__dirname, 'public/system.js') }
    ]),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      "/test": {
        target: "http://localhost:9001",
        pathRewrite: { "^/test": "" }
      }
    }
  },
  devtool: 'source-map',
  externals: []
}
