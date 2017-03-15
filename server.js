var connect = require('connect'),
    serveStatic = require('serve-static'),
    history = require('connect-history-api-fallback'),
    proxy = require('http-proxy-middleware'),
    argv = require('yargs').argv,
    serverRender = require('./wwwroot/dist/server.js').render,
    fs = require('fs'),
    path = require('path');

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

app.use(function (req, res, next) 
{
    if(req.url == '/' || req.url == '/lazy')
    {
        var content = fs.readFileSync(__dirname + '/wwwroot/index.html');

        serverRender(content.toString(), req.url, function(err, succ)
        {
            res.setHeader('Content-Type', 'text/html');

            res.end(err || succ);
        });

        return;
    }

    next();
});

app.use('/data', function (req, res, next) 
{
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify({greeting: 'Hello', name: 'World'}));
})

//proxy special requests to other location
app.use(proxy(['/api'], {target: 'http://localhost:8080', ws: true}));

//enable html5 routing
app.use(history());

//return static files
app.use(serveStatic('wwwroot'));

//create node.js http server and listen on port
app.listen(8888);