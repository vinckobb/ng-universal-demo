var connect = require('connect'),
    serveStatic = require('serve-static'),
    history = require('connect-history-api-fallback'),
    proxy = require('http-proxy-middleware'),
    argv = require('yargs').argv,
    path = require('path')
    url = require('url');

var app = connect();

const wwwroot = "wwwroot";
const serverPath = path.join(__dirname, wwwroot, 'dist/server.js');
var serverRenderFunc;

/**
 * Gets function used for server side rendering
 */
function getServerRenderFunc()
{
    if(!serverRenderFunc || !!argv.webpack)
    {
        serverRenderFunc = require(serverPath).serverRender;
    }

    return serverRenderFunc;
}

function isServerRenderAvailable()
{
    try
    {
        require.resolve(serverPath);
    }
    catch(e)
    {
        return false;
    }

    return true;
}

//enable webpack only if run with --webpack param
if(!!argv.webpack)
{
    var webpack = require('webpack'),
        webpackConfig = require('./webpack.config.js')({hmr: true, dll: true}),
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

app.use('/grid-data', function (req, res, next) 
{
    var data = require('./server.data');

    console.time("GET /grid-data");
    res.setHeader('Content-Type', 'application/json');

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query
    var from = parseInt(query.from);
    var items = parseInt(query.items);
    var selectedData = data.slice(from, from + items);

    res.end(JSON.stringify(
    {
        data: selectedData,
        totalCount: data.length}
    ));
    console.timeEnd("GET /grid-data");
});

app.use('/grid-data-next', function (req, res, next) 
{
    var data = require('./server.data');

    console.time("GET /grid-data");
    res.setHeader('Content-Type', 'application/json');

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query
    var from = parseInt(query.from);
    var items = parseInt(query.items);
    var selectedData = data.slice(from, from + items);

    res.end(JSON.stringify(
    {
        data: selectedData,
        totalCount: (from + items >= data.length ? data.length : from + items + 1)
    }));
    console.timeEnd("GET /grid-data");
});

app.use('/data', function (req, res, next)
{
    console.time("GET /data");
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify({greeting: 'Hello', name: 'World'}));
    console.timeEnd("GET /data");
});

//proxy special requests to other location
app.use(proxy(['/api'], {target: 'http://localhost:8080', ws: true}));

//enable html5 routing
app.use(history());

//angular server side rendering
app.use(function (req, res, next)
{
    if(req.url == '/index.html')
    {
        if(!isServerRenderAvailable())
        {
            next();

            return;
        }

        getServerRenderFunc()(path.join(__dirname, wwwroot, 'index.html'), req.originalUrl, {baseUrl: "http://localhost:8888/", requestCookies: req.headers['cookie']}, function(err, succ)
        {
            res.setHeader('Content-Type', 'text/html');

            if(succ.statusCode)
            {
                res.statusCode = succ.statusCode;
            }

            res.end(err || succ.html);
        });

        return;
    }

    next();
});

//return static files
app.use(serveStatic(wwwroot));

//create node.js http server and listen on port
app.listen(8888);