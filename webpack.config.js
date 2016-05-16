var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var debug = process.env.NODE_ENV !== "production";
console.log(debug);
console.log('********'+process.env.NODE_ENV+'**************');

module.exports = {
    devtool: debug ? "inline-sourcemap" : null,
    entry: {
        rkhy: "./src/js/page/rkhyUserList.js"
    },
    output: {
        path: path.join(__dirname, debug?'/dist/':'/assets/'),
    		publicPath: debug?'/dist/':'/assets/',
    		filename: debug?'js/[name].js':'js/[name]-[hash].js',
    		chunkFilename: 'js/[id].chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            },
			{
				test: /\.html$/,
				exclude: /node_modules/,
				loader: "html?attrs=img:src img:data-src"
			},
			{
				test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				exclude: /node_modules/,
				loader: 'url?name=./fonts/[name]-[hash:10].[ext]'
			},
			{
				test: /\.(png|jpg|gif)$/,
				exclude: /node_modules/,
				loader: 'url?limit=8192&name=./img/[hash:10].[ext]'
			}
        ]
    },
    plugins: debug ? [
        //加载zepto
        /* new webpack.ProvidePlugin({
             $: 'webpack-zepto',
             Zepto: 'webpack-zepto',
             'window.Zepto': 'webpack-zepto'
        }),*/
        new webpack.ProvidePlugin({
            PubSub:'pubsub-js'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['rkhy'], //提取哪些模块共有的部分
            minChunks: 1 // 提取至少3个模块共有的部分
        }),
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            title: '社区问答',
            favicon: './src/img/favicon.ico',
            filename: './view/rkhyUserList.html',
            template: './src/view/rkhyUserList.html',
            inject: 'body',
            cache: false,
            hash: false,
            chunks: ['vendors', 'rkhy'],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new webpack.NoErrorsPlugin()
    ] : [
        new webpack.ProvidePlugin({
            PubSub:'pubsub-js'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['rkhy'], //提取哪些模块共有的部分
            minChunks: 1 // 提取至少3个模块共有的部分
        }),
        new ExtractTextPlugin('css/[name]-[hash].css'),
        new HtmlWebpackPlugin({
            title: '社区问答',
            favicon: './src/img/favicon.ico',
            filename: './view/rkhyUserList.html',
            template: './src/view/rkhyUserList.html',
            inject: 'body',
            cache: false,
            hash: false,
            chunks: ['vendors', 'rkhy'],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                ascii_only: true
            },
            comments: false
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    resolve:{
		 root: '/src',
		 extensions: ['', '.js', '.json', '.jsx'],
		 alias: {
			//后续直接 require('AppStore') 即可
			// AppStore : 'js/stores/AppStores.js',
			// ActionType : 'js/actions/ActionType.js',
			// AppAction : 'js/actions/AppAction.js'
		 }
	},
    devServer: {
		contentBase: './',
		host: '127.0.0.1',
		port: 9000,
		inline: true,
		hot: true,
	}
};
