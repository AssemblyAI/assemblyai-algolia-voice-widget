const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/widget.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'assemblyai-voice-widget.js',
        library: 'AssemblyAIVoiceWidget',
        libraryTarget: 'var',
        libraryExport: 'default'
    },
    module:{
        rules:[
            {
                test: /\.(s*)css$/,
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                          presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000
    }
};