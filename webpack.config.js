var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
    HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    WebpackNotifierPlugin = require('webpack-notifier'),
    CompressionPlugin = require("compression-webpack-plugin"),
    //DashboardPlugin = require('webpack-dashboard/plugin'),
    rxPaths = require('rxjs/_esm5/path-mapping'),
    extend = require('extend'),
    AngularCompilerPlugin =  require('@ngtools/webpack').AngularCompilerPlugin;

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
 * @param {boolean} hmr Indication that currently is running hmr build
 */
function getEntries(aot, ssr, hmr, dll)
{
    if(ssr)
    {
        return {
            server: aot ? path.join(__dirname, "app.aot/main.server.ts") : path.join(__dirname, "app/main.server.ts")
        };
    }
    else
    {
        var entries =
        {
            style: [path.join(__dirname, "content/site.scss")],
            client: hmr ? [path.join(__dirname, "app/main.browser.hmr.ts")] : (aot ? [path.join(__dirname, "app.aot/main.browser.ts")] : [path.join(__dirname, "app/main.browser.ts")]),
            externalStyle: 
            [
                "font-awesome/css/font-awesome.min.css",
                "bootstrap/dist/css/bootstrap.min.css",
                "bootstrap/dist/css/bootstrap-theme.min.css",
                "bootstrap-select/dist/css/bootstrap-select.min.css",
                "eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css",
                "jquery.fancytree/skin-lion/ui.fancytree.css",
                "bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css",
                "highlight.js/styles/googlecode.css"
            ]
        };

        if(dll)
        {
            entries['import-dependencies'] = './webpack.config.dev.imports';
        }

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
    return new AngularCompilerPlugin(
    {
        tsConfigPath: tsconfigs[platform],
        sourceMap: true
    });
}

/**
 * Gets array of webpack loaders for typescript files
 * @param {boolean} aot Indication that currently is running build using AOT
 * @param {boolean} hmr Indication that currently is running build using HMR
 */
function getTypescriptLoaders(aot, hmr)
{
    if(aot)
    {
        return ['@ngtools/webpack'];
    }
    else
    {
        return ['awesome-typescript-loader', 'angular2-template-loader', 'webpack-lazy-module-loader']
            .concat(hmr ? ['webpack-hmr-module-loader'] : []);
    }
}

/**
 * Gets array of webpack loaders for external style files
 * @param {boolean} prod Indication that currently is running production build
 */
function getExternalStyleLoaders(prod)
{
    return prod ? ExtractTextPlugin.extract({fallback: "style-loader", use: ['css-loader'], publicPath: ""}) : ['style-loader', 'css-loader'];
}

/**
 * Gets array of webpack loaders for style files
 * @param {boolean} prod Indication that currently is running production build
 */
function getStyleLoaders(prod)
{
    return prod ? ExtractTextPlugin.extract({fallback: "style-loader", use: ['css-loader', 'sass-loader'], publicPath: ""}) : ['style-loader', 'css-loader', 'sass-loader'];
}

module.exports = function(options, args)
{
    var prod = args && args.mode == 'production';
    var hmr = !!options && !!options.hmr;
    var aot = !!options && !!options.aot;
    var ssr = !!options && !!options.ssr;
    var dll = !!options && !!options.dll;
    var ngsw = process.env.NGSW == "true";

    if(!!options && options.ngsw != undefined)
    {
        ngsw = !!options.ngsw;
    }

    console.log(`Angular service worker enabled: ${ngsw}.`);

    var distPath = "wwwroot/dist";
    options = options || {};

    console.log(`Running build with following configuration Production: ${prod} Hot Module Replacement: ${hmr} Ahead Of Time Compilation: ${aot} Server Side Rendering: ${ssr}`)

    var config =
    {
        entry: getEntries(aot, ssr, hmr, dll),
        output:
        {
            path: path.join(__dirname, distPath),
            filename: '[name].js',
            publicPath: prod ? 'dist/' : '/dist/',
            chunkFilename: `[name].${ssr ? 'server' : 'client'}.chunk.js`
        },
        mode: 'development',
        devtool: hmr ? 'none' : 'source-map',
        target: ssr ? 'node' : 'web',
        resolve:
        {
            extensions: ['.ts', '.js'],
            alias: extend(rxPaths(), 
            {
                "numeral-languages": path.join(__dirname, "node_modules/numeral/locales.js"),
                "handlebars": path.join(__dirname, "node_modules/handlebars/dist/handlebars.js"),
                "typeahead": path.join(__dirname, "node_modules/typeahead.js/dist/typeahead.jquery.js"),
                "jquery.fancytree": path.join(__dirname, "node_modules/jquery.fancytree/src"),
                "moment": path.join(__dirname, "node_modules/moment/min/moment-with-locales.js"),
                "config/global": path.join(__dirname, prod ? "config/global.json" : "config/global.development.json"),
                "config/version": path.join(__dirname, "config/version.json"),
                "app": path.join(__dirname, "app")
            })
        },
        module:
        {
            rules:
            [
                //server globals
                {
                    test: require.resolve("form-data"),
                    use:
                    [
                        {
                            loader: 'expose-loader',
                            options: 'FormData'
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
                    test: aot ? /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/ : /\.ts$/,
                    use: getTypescriptLoaders(aot, hmr)
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.css$/,
                    use: getExternalStyleLoaders(prod)
                },
                {
                    test: /\.scss$/,
                    use: getStyleLoaders(prod)
                },
                {
                    test: /\.(ttf|woff|woff2|eot|svg|png|jpeg|jpg|bmp|gif|icon|ico)$/,
                    loader: "file-loader"
                }
            ]
        },
        plugins:
        [
            new WebpackNotifierPlugin({title: `Webpack - ${hmr ? 'HMR' : (ssr ? 'SSR' : 'BUILD')}`, excludeWarnings: true, alwaysNotify: true}),
            //copy external dependencies
            new CopyWebpackPlugin(
            [
                // {
                //     context: path.join(__dirname, "content/help"),
                //     from: '**/*.*',
                //     to: 'md'
                // },
                // {
                //     from: path.join(__dirname, "../changelog.md"),
                //     to: 'md',
                //     flatten: true
                // },
                // {
                //     from: path.join(__dirname, "../readme.md"),
                //     to: 'md',
                //     flatten: true
                // }
            ]),
            new webpack.DefinePlugin(
            {
                isProduction: prod,
                isNgsw: ngsw
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
                //import-dependencies always as first
                if(a.names[0] == 'import-dependencies')
                {
                    return -1;
                }

                if(b.names[0] == 'import-dependencies')
                {
                    return 1;
                }

                if(a.names[0] == 'externalStyle')
                {
                    return -1;
                }

                if(b.names[0] == 'externalStyle')
                {
                    return 1;
                }

                return 0;
            }
        }));

        config.plugins.push(new ScriptExtHtmlWebpackPlugin(
                            {
                                defaultAttribute: 'defer'
                            }));
    }

    //aot specific settings
    if(aot)
    {
        config.plugins.push(getAotPlugin(ssr ? 'server' : 'client'));
    }

    if(hmr)
    {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        //config.plugins.push(new DashboardPlugin());

        Object.keys(config.entry).forEach(entry =>
        {
            if(config.entry[entry].constructor === Array)
            {
                config.entry[entry].unshift('webpack-hot-middleware/client');
            }
        });
    }

    //only if dll package is required, use only for development
    if(dll)
    {
        config.plugins.push(new webpack.DllReferencePlugin(
        {
            context: __dirname,
            manifest: require(path.join(__dirname, distPath + '/dependencies-manifest.json'))
        }));

        config.plugins.push(new HtmlWebpackIncludeAssetsPlugin(
        {
            assets: ['dependencies.js'],
            append: false
        }));
    }

    //production specific settings - prod is used only for client part
    if(prod)
    {
        config.output.filename = "[name].[hash].js";
        config.output.chunkFilename = `[name].${ssr ? 'server' : 'client'}.chunk.[chunkhash].js`;

        config.plugins.push(new ExtractTextPlugin("style.[md5:contenthash:hex:20].css"));
        config.plugins.push(new CompressionPlugin({test: /\.js$|\.css$/}));
    }

    return config;
}