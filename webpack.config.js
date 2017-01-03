var webpack = require('webpack');
var ngToolsWebpack = require('@ngtools/webpack');

var config = {
    entry: {
        'vendor': ['./src/polyfills', './src/vendor'],
        'app': './src/main'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts', '.js', '.jpg', '.jpeg', '.gif', '.png', '.css', '.html']
    },
    module: {
        loaders: [
            {test: /\.(jpg|jpeg|gif|png|eof|woff|woff2|svg)$/, loader: 'file-loader?name=img/[path][name].[ext]'},
            {test: /\.(css|xlf|json)$/, loader: 'raw-loader'},
            {test: /\.html$/, loaders: ['html-loader']}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
            __dirname + './src'
        ),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};

if (process.env.NODE_ENV === 'aot') {
    config.module.loaders.push(
        {
            test: /\.ts$/,
            loaders: '@ngtools/webpack'
        }
    );
    config.plugins.push(new ngToolsWebpack.AotPlugin(
        {
            tsConfigPath: 'tsconfig.aot.json',
            entryModule: 'src/app/app.module#AppModule'
        }
    ));
} else {
    config.node = {
        __filename: true
    };
    config.devServer = {
        inline: true,
        port: 8080,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    };
    config.devtool = 'cheap-module-source-map';
    config.module.loaders.push(
        {
            test: /\.ts$/,
            loaders: ['angular2-template-loader', 'awesome-typescript-loader', 'angular-router-loader'],
            exclude: /node_modules/
        }
    );
    config.module.preLoaders = [
        {test: /\.ts$/, loader: "tslint"}
    ];
}

module.exports = config;