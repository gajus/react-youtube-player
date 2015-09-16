var webpack = require('webpack'),
    path = require('path'),
    devServer;

devServer = {
    contentBase: __dirname + '/endpoint',
    colors: true,
    quiet: false,
    noInfo: false,
    publicPath: '/static/',
    historyApiFallback: false,
    host: '127.0.0.1',
    port: 8000,
    hot: true
};

module.exports = {
    devtool: 'eval-source-map',
    debug: true,
    devServer: devServer,
    context: __dirname,
    entry: {
        app: [
            './src/index.js'
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        publicPath: devServer.publicPath
    },
    plugins: [
        new webpack.OldWatchingPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel'
            }
        ]
    },
    resolve: {
        extensions: [
            '',
            '.js'
        ],
        alias: {
            react: path.resolve('./node_modules/react')
        }
    }
};
