var connect = require('connect'),
    serveStatic = require('serve-static'),
    history = require('connect-history-api-fallback'),
    proxy = require('http-proxy-middleware'),
    argv = require('yargs').argv;

var app = connect();

//enable webpack only if run with --webpack param
if(!!argv.webpack)
{
    var webpack = require('webpack'),
        webpackConfig = require('./webpack.config.index.js')({hmr: true}),
        webpackDev = require('webpack-dev-middleware'),
        hmr = require("webpack-hot-middleware");

    var compiler = webpack(webpackConfig);

    //enables webpack dev middleware
    app.use(webpackDev(compiler, 
    {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));

    app.use(hmr(compiler));
}

//proxy special requests to other location
app.use(proxy(['/api'], {target: 'http://localhost:8080', ws: true}));

//enable html5 routing
app.use(history());

//return static files
app.use(serveStatic('dist'));

//create node.js http server and listen on port
app.listen(8888);