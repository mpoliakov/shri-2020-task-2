const path = require('path');

module.exports = {
    entry: ['./src/linter.ts', 'json-to-ast'],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js' ],
    },
    output: {
        filename: 'linter.js',
        path: path.resolve(__dirname, 'build'),
    },
};