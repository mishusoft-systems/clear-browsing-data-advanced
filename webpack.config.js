/**
 * IP Info Plus
 * Developer: Al-Amin Ahamed
 * Website: https://www.mishusoft.com
 * Home: https://mishusoft.com/brower/addons/ipinfoplus/
 * license : GPL-3.0-only
 * */

// External core dependencies
const path = require('path');
const {ProgressPlugin} =  require('webpack');

// External third party dependencies
const WebExtWebpackPlugin = require('web-ext-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

// Internal dependencies


const commonConfig = {
    mode: 'production',
    context: path.resolve(__dirname, './src'),

    //dev conf
    devServer: {
         static: {
            directory: path.join(__dirname, '/dist-chrome'),
            publicPath: ''
         },
        port: 4000,
        open: ['./popup.html'],
        watchFiles: ['src/**/*'],
        compress: true,
        client: {
            progress: true,
            reconnect: true,
        },
    },

    stats : {
      errorDetails : true,
    },

    module: {
        rules: [
            {
                // compile sass, scss file
                test: /\.(sa|sc|c)ss$/i,
                exclude: /node_modules/,
                use: [
                    // Minify compiled css files.
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS.
                    "css-loader",
                    // postcss Loader.
                    "postcss-loader",
                    // Compiles Sass to CSS.
                    "sass-loader",
                ],
            },
            {
                test: /\.(html)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        esModule: true,
                    }
                }]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[contentHash].[ext]",
                        outputPath: "assets/images/"
                    }
                }
            },
        ],
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src"),
            utils: path.resolve(__dirname, "src/common/utils/"),
            components: path.resolve(__dirname, "src/components"),
        },
        extensions: ['.ts', '.tsx', '.json'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['popup'],
            minify: true,
            scriptLoading: 'blocking',
            filename: 'popup.html',
            template: 'assets/html/template.html',
        }),
        new HtmlWebpackTagsPlugin({
            tags: ['assets/css/app.css'],
            append: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: './_locales/', to: './_locales/'},
                {from: './assets/images/', to: './assets/images/[name][ext]'},
            ]
        }),
        new MiniCssExtractPlugin({
            filename: `[name][ext]`,
            chunkFilename: `[id][ext]`,
        }),
        new ProgressPlugin(),
    ],
}

const commonExtConfig = {
    ...commonConfig,
    entry: {
        'content': ['./assets/typescript/app.ts', './manifest.json.src'],
        'background': './assets/typescript/background.ts',
        'popup': './assets/typescript/popup.ts',
    }
};

const firefoxConfig = {
    ...commonExtConfig,
    module: {
        rules: [
            ...commonExtConfig.module.rules,
            {
                type: 'javascript/auto',
                test: /\.src$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name]"
                        }
                    }, {
                        loader: 'webpack-preprocessor-loader',
                        options: {
                            params: {
                                browser_specific_settings: true,
                                supports_svg_icons: true,
                                supports_browser_style: true,
                            },
                            verbose: false,
                        },
                    },
                ]
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader', {
                    loader: 'webpack-preprocessor-loader',
                    options: {
                        params: {
                            ENV: 'production',
                            debug: false,
                        },
                        verbose: false,
                    },
                },],
                exclude: /node_modules/,
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist-firefox'),
        filename: 'assets/js/[name].js',
    },
    plugins: [
        ...commonExtConfig.plugins,
        new WebExtWebpackPlugin({
            sourceDir: path.resolve(__dirname, 'dist-firefox'),
            firefox,
            firefoxProfile,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: './assets/sass/app.css*', to: './assets/css/[name][ext]'}
            ]
        }),
    ],
};

const chromeConfig = {
    ...commonExtConfig,
    module: {
        rules: [
            ...commonExtConfig.module.rules,
            {
                type: 'javascript/auto',
                test: /\.src$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name]"
                        }
                    }, {
                        loader: 'webpack-preprocessor-loader',
                        options: {
                            params: {
                                browser_specific_settings: false,
                                supports_svg_icons: false,
                                supports_browser_style: true,
                            },
                            verbose: false,
                        },
                    },
                ]
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader', {
                    loader: 'webpack-preprocessor-loader',
                    options: {
                        params: {
                            ENV: 'production',
                            debug: false,
                        },
                        verbose: false,
                    },
                },],
                exclude: /node_modules/,
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist-chrome'),
        filename: 'assets/js/[name].js',
    },
    plugins: [
        ...commonExtConfig.plugins,
        new CopyWebpackPlugin({
            patterns: [
                {from: './assets/sass/app.css*', to: './assets/css/[name][ext]'}
            ]
        }),
    ],
};

module.exports = (env) => {
    let configs = []
    if (env && env.target === 'chrome') {
        configs.push({...chromeConfig, name: 'extension'})
    } else {
        configs.push({...firefoxConfig, name: 'extension'})
    }

    return configs;
};