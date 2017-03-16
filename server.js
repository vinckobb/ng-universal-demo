var connect = require('connect'),
    serveStatic = require('serve-static'),
    history = require('connect-history-api-fallback'),
    proxy = require('http-proxy-middleware'),
    argv = require('yargs').argv,
    fs = require('fs'),
    path = require('path');

var app = connect();

const wwwroot = "wwwroot";
var serverRenderFunc;

/**
 * Gets function used for server side rendering
 */
function getServerRenderFunc()
{
    if(!serverRenderFunc || !!argv.webpack)
    {
        serverRenderFunc = require(path.join(__dirname, wwwroot, 'dist/server.js')).serverRender;
    }

    return serverRenderFunc;
}

//enable webpack only if run with --webpack param
if(!!argv.webpack)
{
    var webpack = require('webpack'),
        webpackConfig = require('./webpack.config.js')({hmr: true}),
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

app.use('/data', function (req, res, next) 
{
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify({greeting: 'Hello', name: 'World'}));
})

//proxy special requests to other location
app.use(proxy(['/api'], {target: 'http://localhost:8080', ws: true}));

//enable html5 routing
app.use(history());

//angular server side rendering
app.use(function (req, res, next) 
{
    if(req.url == '/index.html')
    {
        getServerRenderFunc()(path.join(__dirname, wwwroot, 'index.html'), req.originalUrl, function(err, succ)
        {
            res.setHeader('Content-Type', 'text/html');

            res.end(err || succ);
        });

        return;
    }

    next();
});

//return static files
app.use(serveStatic(wwwroot));

//create node.js http server and listen on port
app.listen(8888);