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

//mock rest api
require('./server.mock')(app);

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

console.log("Listening on port 8888 => http://localhost:8888");
//create node.js http server and listen on port
app.listen(8888);