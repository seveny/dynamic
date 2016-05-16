/*eslint-disable no-console, no-var */
var express = require('express')
var rewrite = require('express-urlrewrite')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')
var fs = require('fs')
var path = require('path')
var log4js = require('log4js');
var log = log4js.getLogger("app");

var app = express()
/**
 * make a log directory, just in case it isn't there.
 */
try {
  require('fs').mkdirSync('./log');
} catch (e) {
  if (e.code != 'EEXIST') {
    console.error("Could not set up log directory, error was: ", e);
    process.exit(1);
  }
}
log4js.configure('./config/log4js.json');

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/assets/',
  stats: {
    colors: true
  }
}));

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

//app.use(rewrite('/feed/event/*', '/dist/view/eventList.html'));
//app.use(rewrite('/feed/tag/*', '/dist/view/tagList.html'));
//app.use(rewrite('/feed/user/*', '/dist/view/userList.html'));
app.use(rewrite('/feed/rkhy', '/assets/view/rkhyUserList.html'));

app.use(express.static(__dirname))

app.use(function(req, res, next) {
  log.error('Something went wrong:'+req.url+" not found");
  res.redirect('http://w.haiziwang.com/404.html');
});

app.listen(7000, function () {
  console.log('Server listening on http://localhost:7000, Ctrl+C to stop')
})
