var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    VirtualModulePlugin = require('virtual-module-webpack-plugin'),
    preboot = require('preboot'),
    AotPlugin =  require('@ngtools/webpack').AotPlugin;

//Preboot options
const prebootOptions = 
{
    appRoot: "app", 
    buffer: false,
    eventSelectors:
    [
        {
            selector: "input,textarea",
            events: ["keypress","keyup","keydown","input","change"]
        },
        {
            selector: "select,option",
            events: ["change"]
        },
        {
            selector: "input",
            events: ["keyup"],
            preventDefault: true,
            keyCodes: [13],
            freeze: true
        },
        {
            selector: "input,textarea",
            events: ["focusin","focusout","mousedown","mouseup"],
            noReplay: true
        },
        {
            selector: "input[type=\"submit\"],button",
            events: ["click"],
            preventDefault: true,
            freeze: true
        }
    ]
};  


//array of paths for server and browser tsconfigs
const tsconfigs = 
{
    client: path.join(__dirname, 'tsconfig.browser.json'),
    server: path.join(__dirname, 'tsconfig.server.json')
};

/**
 * Gets entries for webpack
 * @param {boolean} aot Indicates that it should be AOT entries
 * @param {boolean} ssr Indicates that it should be entries for server side rendering
 * @param {boolean} prod Indication that currently is running production build
 * @param {boolean} hmr Indication that currently is running hmr build
 */
function getEntries(aot, ssr, prod, hmr)
{
    if(ssr)
    {
        return {
            server: aot ? [path.join(__dirname, "app.aot/main.server.aot.ts")] : [path.join(__dirname, "app/main.server.ts")]
        };
    }
    else
    {
        var entries = 
        {
            style: [path.join(__dirname, "content/site.scss")],
            client: hmr ? [path.join(__dirname, "app/main.browser.hmr.ts")] : (aot ? [path.join(__dirname, "app.aot/main.browser.ts")] : [path.join(__dirname, "app/main.browser.ts")]),
            "inline-preboot": ["./inline-preboot"]
        };

        return entries;
    }
}

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

/**
 * Gets array of webpack loaders for style files
 * @param {boolean} prod Indication that currently is running production build
 */
function getStyleLoaders(prod)
{
    return prod ? ExtractTextPlugin.extract({fallback: "style-loader", use: ['css-loader', 'sass-loader'], publicPath: ""}) : ['style-loader', 'css-loader', 'sass-loader'];
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
        entry: getEntries(aot, ssr, prod, hmr),
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
                "numeral-languages": path.join(__dirname, "node_modules/numeral/locales.js"),
                "handlebars": path.join(__dirname, "node_modules/handlebars/dist/handlebars.js"),
                "typeahead": path.join(__dirname, "node_modules/typeahead.js/dist/typeahead.jquery.js"),
                "moment": path.join(__dirname, "node_modules/moment/min/moment-with-locales.js"),
                "./locale": path.join(__dirname, "node_modules/moment/locale"),
                "config/global": path.join(__dirname, "config/global.json"),
                "preboot": path.join(__dirname, "node_modules/preboot/__dist/preboot_browser.js"),
                "app": path.join(__dirname, "app")
            }
        },
        module:
        {
            rules:
            [
                //preboot
                { 
                    test: path.join(__dirname, "node_modules/preboot/__dist/preboot_browser.js"),
                    use: 
                    [
                        {
                            loader: 'expose-loader',
                            options: 'preboot'
                        },
                        {
                            loader: 'exports-loader',
                            options: 'preboot'
                        }
                    ]
                },
                //vendor globals
                { 
                    test: require.resolve("jquery"),
                    use: 
                    [
                        {
                            loader: 'expose-loader',
                            options: '$'
                        },
                        {
                            loader: 'expose-loader',
                            options: 'jQuery'
                        }
                    ] 
                },
                {
                    test: require.resolve("numeral"),
                    use: 
                    [
                        {
                            loader: 'expose-loader',
                            options: 'numeral'
                        }
                    ]
                },
                //file processing
                {
                    test: /\.ts$/,
                    use: getTypescriptLoaders(prod, aot, hmr) 
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                },
                { 
                    test: /\.css$/, 
                    loader: 'raw-loader' 
                },
                {
                    test: /\.scss$/,
                    use: getStyleLoaders(prod)
                },
                {
                    test: /\.(ttf|eot|svg)$/,
                    loader: "file-loader"
                }
            ]
        },
        plugins: 
        [
            new VirtualModulePlugin(
            {
                moduleName: 'inline-preboot',
                contents: preboot.getInlineCode(prebootOptions)
            })
        ]
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
            inject: 'head',
            chunksSortMode: function orderEntryLast(a, b) 
            {
                if(a.names[0] == 'inline-preboot')
                {
                    return -1;
                }

                if(b.names[0] == 'inline-preboot')
                {
                    return 1;
                }

                return 0;
            }
        }));

        config.plugins.push(new ScriptExtHtmlWebpackPlugin(
        {
            defaultAttribute: 'defer',
            inline: 'inline-preboot'
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

    //production specific settings - prod is used only for client part
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

        config.plugins.push(new ExtractTextPlugin("style.[contenthash].css"));
    }

    return config;
}