var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    AotPlugin =  require('@ngtools/webpack').AotPlugin;


/**
 * Gets entries for webpack
 * @param {boolean} aot Indicates that it should be AOT entries
 * @param {boolean} ssr Indicates that it should be entries for server side rendering
 */
function getEntries(aot, ssr)
{
    if(ssr)
    {
        return {
            server: aot ? [path.join(__dirname, "app.aot/main.server.aot.ts")] : [path.join(__dirname, "app/main.server.ts")]
        }
    }
    else
    {
        return {
            client: aot ? [path.join(__dirname, "app.aot/main.browser.aot.ts")] : [path.join(__dirname, "app/main.browser.ts")],
            style: [path.join(__dirname, "content/site.scss")],
        }
    }
}

//array of paths for server and browser tsconfigs
const tsconfigs = 
{
    client: path.join(__dirname, 'tsconfig.browser.json'),
    server: path.join(__dirname, 'tsconfig.server.json')
};

/**
 * Generates a AotPlugin for @ngtools/webpack
 *
 * @param {string} platform Should either be client or server
 * @returns
 */
function getAotPlugin(platform) 
{
    return new AotPlugin(
    {
        tsConfigPath: tsconfigs[platform],
        skipCodeGeneration: false
    });
}

/**
 * Gets array of webpack loaders for typescript files
 * @param {boolean} prod Indication that currently is running production build
 * @param {boolean} aot Indication that currently is running build using AOT
 * @param {boolean} hmr Indication that currently is running build using HMR
 */
function getTypescriptLoaders(prod, aot, hmr)
{
    if(aot)
    {
        return ['@ngtools/webpack'];
    }
    else
    {
        return ['awesome-typescript-loader' + (prod ? '' : '?sourceMap=true'), 'angular2-template-loader', 'webpack-lazy-module-loader'].concat(hmr ? ['webpack-hmr-module-loader'] : []);
    }
}

module.exports = function(options)
{
    var prod = !!options && !!options.prod;
    var hmr = !!options && !!options.hmr;
    var aot = !!options && !!options.aot;
    var ssr = !!options && !!options.ssr;
    var distPath = "wwwroot/dist";
    options = options || {};

    console.log(`Running build with following configuration Production: ${prod} Hot Module Replacement: ${hmr} Ahead Of Time Compilation: ${aot} Server Side Rendering: ${ssr}`)

    var config =
    {
        entry: getEntries(aot, ssr),
        output:
        {
            path: path.join(__dirname, distPath),
            filename: '[name].js',
            publicPath: prod ? 'dist/' : '/dist/',
            chunkFilename: `[name].${ssr ? 'server' : 'client'}.chunk.js`
        },
        devtool: prod ? false : 'source-map',
        target: ssr ? 'node' : 'web',
        resolve:
        {
            extensions: ['.ts', '.js'],
            alias:
            {
                // "numeral-languages": path.join(__dirname, "node_modules/numeral/locales.js"),
                // "handlebars": path.join(__dirname, "node_modules/handlebars/dist/handlebars.js"),
                // "typeahead": path.join(__dirname, "node_modules/typeahead.js/dist/typeahead.jquery.js"),
                // "moment": path.join(__dirname, "node_modules/moment/min/moment-with-locales.js"),
                // "./locale": path.join(__dirname, "node_modules/moment/locale"),
                // "config/global": path.join(__dirname, "config/global.json"),
                "app": path.join(__dirname, "app")
            }
        },
        module:
        {
            rules:
            [
                //vendor globals
                // { 
                //     test: require.resolve("jquery"),
                //     loader: "expose-loader?$!expose-loader?jQuery" 
                // },
                // {
                //     test: require.resolve("numeral"),
                //     loader: 'expose-loader?numeral'
                // },
                //file processing
                {
                    test: /\.ts$/,
                    loaders: getTypescriptLoaders(prod, aot, hmr) 
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                },
                // {
                //     test: /\.json$/,
                //     loader: 'json-loader'
                // },
                { 
                    test: /\.css$/, 
                    loader: 'raw-loader' 
                },
                {
                    test: /\.scss$/,
                    loaders: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(ttf|eot|svg)$/,
                    loader: "file-loader"
                }
            ]
        },
        plugins: []
    };

    //server specific settings
    if(ssr)
    {

    }
    //client specific settings
    else
    {
        config.plugins.push(new HtmlWebpackPlugin(
        {
            filename: "../index.html",
            template: path.join(__dirname, "index.html"),
            inject: 'body'
        }));
    }

    //aot specific settings
    if(aot)
    {
        config.plugins.unshift(getAotPlugin(ssr ? 'server' : 'client'));
    }

    if(hmr)
    {
        config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

        Object.keys(config.entry).forEach(entry =>
        {
            config.entry[entry].unshift('webpack-hot-middleware/client');
        });
    }

    //production specific settings
    if(prod)
    {
        config.output.filename = "[name].[hash].js";
        config.output.chunkFilename = `[name].${ssr ? 'server' : 'client'}.chunk.[chunkhash].js`;

        config.plugins.unshift(new webpack.optimize.UglifyJsPlugin({
                                                                       beautify: false,
                                                                       mangle: 
                                                                       {
                                                                           screw_ie8: true,
                                                                           keep_fnames: true
                                                                       },
                                                                       compress: 
                                                                       {
                                                                           warnings: false,
                                                                           screw_ie8: true
                                                                       },
                                                                       comments: false,
                                                                       sourceMap: false
                                                                   }));
    }

    return config;
}