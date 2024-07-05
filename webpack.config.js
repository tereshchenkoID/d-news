const webpack = require('webpack');
const path = require('path');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const config = require('./gulp/config');

function createConfig(env) {
  let isProduction;
  let webpackConfig;

  if (env === undefined) {
    // eslint-disable-next-line no-param-reassign
    env = process.env.NODE_ENV;
  }

  // eslint-disable-next-line prefer-const
  isProduction = env === 'production';

  // eslint-disable-next-line prefer-const
  webpackConfig = {
    mode: isProduction ? 'production' : 'development',
    context: path.join(__dirname, config.src.js),
    entry: {
      app: './app.js',
    },
    output: {
      path: path.join(__dirname, config.dest.js),
      filename: '[name].js',
      publicPath: 'js/',
    },
    // devtool: isProduction ?
    //   '#source-map' :
    //   '#cheap-module-eval-source-map',
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            // eslint-disable-next-line global-require
            formatter: require('eslint-formatter-pretty')
          }
        }
      }),
      new webpack.NoEmitOnErrorsPlugin(),

      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerPort: 4000,
        openAnalyzer: false,
      }),
    ],
    resolve: {
      extensions: ['.js'],
      alias: {},
    },
    optimization: {
      minimize: false
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ],
          loader: 'eslint-loader',
          options: {
            fix: true,
            cache: true,
            ignorePattern: `${__dirname  }/src/js/lib/`
          }
        }, {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ],
        },
        { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/ },
        { test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/ }
      ],
    },
  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      })
    );
  }

  return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
