var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    AotPlugin =  require('@ngtools/webpack').AotPlugin;

function getEntryName(aot, ssr)
{
    if(ssr)
    {
        return aot ? [path.join(__dirname, "src/main.server.aot.ts")] : [path.join(__dirname, "src/main.server.ts")];
    }
    else
    {
        return [path.join(__dirname, "src/main.browser.ts")];
    }
}

const tsconfigs = 
{
    client: path.join(__dirname, 'tsconfig.browser.json'),
    server: path.join(__dirname, 'tsconfig.server.json')
};

/**
 * Generates a AotPlugin for @ngtools/webpack
 *
 * @param {string} platform Should either be client or server
 * @param {boolean} aot Enables/Disables AoT Compilation
 * @returns
 */
function getAotPlugin(platform, aot) 
{
    return new AotPlugin(
    {
        tsConfigPath: tsconfigs[platform],
        skipCodeGeneration: !aot
    });
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
        entry:
        {
            //"style": [path.join(__dirname, "content/site.scss")],
            //"app": [path.join(__dirname, "app/app.ts")]
        },
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
                    loader: '@ngtools/webpack' 
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
                // {
                //     test: /\.scss$/,
                //     loaders: ['style-loader', 'css-loader', 'sass-loader']
                // },
                // {
                //     test: /\.(ttf|eot|svg)$/,
                //     loader: "file-loader"
                // },
                // {
                //     test: /\.hbs$/,
                //     loader: "handlebars-loader",
                //     query: 
                //     { 
                //         helperDirs: [path.join(__dirname, '/node_modules/webpack-handlebars-replace')],
                //     }
                // }
            ]
        },
        plugins: [getAotPlugin(ssr ? 'server' : 'client', !!options.aot)]
    };

    config.entry[ssr ? "server" : "client"] = getEntryName(aot, ssr);

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

    // if(hmr)
    // {
    //     config.entry.app.unshift('webpack-hot-middleware/client');
    //     config.entry.style.unshift('webpack-hot-middleware/client');
    // }

    // if(prod)
    // {
    //     config.output.filename = "[name].[hash].js";
    //     config.output.chunkFilename = "[name].chunk.[chunkhash].js";

    //     config.plugins.unshift(new AotPlugin(
    //     {
    //         tsConfigPath: './tsconfig.json',
    //         entryModule: './app/app.module#AppModule',
    //         mainPath: './app/app.aot'
    //     }));

    //     config.plugins.unshift(new HtmlWebpackPlugin(
    //     {
    //         filename: "../index.html",
    //         template: path.join(__dirname, 'index.html.hbs'),
    //         inject: false
    //     }));
    // }

    return config;
}