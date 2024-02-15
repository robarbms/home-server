const Dotenv = require('dotenv-webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const mergeOptions = (defaults, overrides, deep = ['module', 'optimization', 'resolve']) => {
    const config = {}
    for (const key in defaults) {
        config[key] =
            key in overrides ?
                deep.includes(key) ? mergeOptions(defaults[key], overrides[key]) :
                overrides[key]
            :
            defaults[key];
    }
    return config;
}

module.exports = (env, argv) => {
    const {mode, performanceHints = ''} = argv;
    const is_report = performanceHints == 'warning';
    const template = './public/index.html';
    const favicon = './public/favicon.ico';

    const defaults = {
        entry: path.resolve(__dirname,'src/index.tsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.(jpg|png|svg|gif|ttf|pdf|webp|ico|json)$/,
                    type: 'asset/resource'
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: 'ts-loader'
                }
            ]
        },
        optimization: {
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin()
            ],
            minimize: true
        },
        plugins: [
            new Dotenv(),
            new HtmlWebpackPlugin({
              template: template,
              minify: {
                collapseWhitespace: true,
                removeComments: true,
              },
              favicon: favicon,
            }),
            new MiniCssExtractPlugin({
              filename: 'styles.css',
            }),
            new CopyPlugin({
                patterns: [
                    { from: "src/manifest.json"},
                ]
            })
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.json']
        },
        watch: false,
        watchOptions: {
            ignored: ['**/dev/**', '**/node_modules']
        }
    }

    const options = {
        production: {},
        development: {
            output: {
                path: path.resolve(__dirname, 'dev'),
            },
            optimization: {
                minimizer: [
                    new TerserPlugin(),
                    new CssMinimizerPlugin()
                ],
                minimize: true
            },
            plugins: [
                new Dotenv(),
                new HtmlWebpackPlugin({
                  template: template,
                  minify: {
                    collapseWhitespace: false,
                    removeComments: false,
                  },
                  favicon: favicon,
                }),
                new MiniCssExtractPlugin({
                    filename: 'styles.css',
                  }),
                new CopyPlugin({
                    patterns: [
                        "pwa"
                    ]
                }),
                new CompressionPlugin(),
            ],
            watch: true
        }
    }

    const config = mergeOptions(defaults, options[mode]);

    return config;
}