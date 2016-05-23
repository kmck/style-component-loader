var path = require('path');

module.exports = {
    target:  'node',
    context: __dirname,
    entry: './src/example.js',
    output:  {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.tpl\.scss$/,
            loader: path.join(__dirname, '../') + '!css!sass',
        }, {
            test: /\.scss$/,
            exclude: /\.tpl\.scss$/,
            loader: 'style/useable!css!sass',
        }],
    },
};
