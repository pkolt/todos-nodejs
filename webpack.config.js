const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDebug = NODE_ENV === 'development';


module.exports = {
    debug: isDebug,

    context: __dirname + '/todos/static/src',

    entry: {
        index: './index'
    },

    output: {
        path: __dirname + '/todos/static/dist',
        filename: '[name].js',
        library: '[name]'
    },

    watch: isDebug,
    devtool: isDebug ? 'source-map' : null,

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
                moduleIds: true,
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css?minimize')
        }, {
            test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            include: /\/node_modules\//,
            loader: 'file?name=[1]&regExp=node_modules/(.*)'
        }, {
            test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            exclude: /\/node_modules\//,
            loader: 'file?name=[path][name]'
        }]
    },

    plugins: (function(){
        var plugins = [];

        if (!isDebug) {
            plugins = plugins.concat([
                // Минификация скриптов.
                new webpack.optimize.UglifyJsPlugin({
                   compress: {
                       warnings: false,
                       drop_console: true,
                       unsafe: true
                   }
                })
            ]);
        }

        plugins = plugins.concat([
            // Плагин позволяет не создавать бандлы если возникли ошибки.
            new webpack.NoErrorsPlugin(),
            // Стили со всех модулей сбрасываем в один файл.
            new ExtractTextPlugin('[name].css', {allChunks: true})
        ]);
        return plugins;
    })()
};
