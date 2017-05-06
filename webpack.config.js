var path = require('path');

module.exports = {
    context: __dirname,
    entry: path.resolve(__dirname, 'entry/index'),

    output: {
        path: path.resolve(__dirname, 'public/dist/bundle'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['babel-loader']
            }
        ]
    },

    resolve: {
        modulesDirectories: [
            'entry',
            'node_modules',
            './src/components'
        ],
        extensions: [''/*for react*/, '.js', '.jsx'],
        alias: {}
    },

    eslint : {
        configFile : path.resolve(__dirname, '.eslintrc.json')
    }
};
