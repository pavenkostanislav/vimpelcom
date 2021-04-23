var express = require('express');
const app = express();
const apiRouter = require('./api-router');
app.options('/OnlineApprovalDev/api/application/prefilling/:t', (req, res) =>
  res
    .status(200)
    .header('Accept', 'application/json')
    .header('X-Requested-With', 'XMLHttpRequest')
    .header('Access-Control-Allow-Origin', 'http://localhost:5555')
    .header('Access-Control-Allow-Credentials', true)
    .header('Access-Control-Allow-Methods', 'GET')
    .header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
    )
    .send('ok')
);

app.options('/OnlineApprovalDev/api/rb/*', function (req, res) {
  res
    .status(200)
    .header('Accept', 'application/json')
    .header('X-Requested-With', 'XMLHttpRequest')
    .header('Access-Control-Allow-Origin', '*')
    .header(
      'Access-Control-Allow-Methods',
      'GET, POST, HEAD, PUT, DELETE, OPTIONS'
    )
    .header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
    )
    .send('ok');
});

app.options('/OnlineApprovalDev/api/*', (req, res) =>
  res
    .status(200)
    .header('Accept', 'application/json, image/svg+xml')
    .header('X-Requested-With', 'XMLHttpRequest')
    .header('Access-Control-Allow-Origin', 'http://localhost:5555')
    .header('Access-Control-Allow-Credentials', true)
    .header('Access-Control-Allow-Methods', 'GET')
    .header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers,responseType'
    )
    .send('ok')
);

app.use('/OnlineApprovalDev/api/', apiRouter);

var http = require('http').createServer(app);
http.listen(3000, function () {
  console.log(`Server running at http://${http.address().address}:3000/`);
});

// ---------------------------------------------------------
// EX https://online-auto.rusfinance.ru/OnlineApproval/api/user/id
const appProxy = require('express')();
const { createProxyMiddleware } = require('http-proxy-middleware');

var target = {
  host: 'store-test.rosbank.ru',
  protocol: 'https:',
  port: 62443,
  https: true
};

const server = createProxyMiddleware({
  logLevel: 'debug',
  target,
  secure: false,
  changeOrigin: true,
  agent: false,
  cookiePathRewrite: false,
  onProxyReq: function (proxyReq, req, res) {},
  onProxyRes: function (proxyRes, req, res) {
    const sc = proxyRes.headers['set-cookie'];
    if (Array.isArray(sc)) {
      console.log(`before set-cookie: ${sc[0]}`);

      proxyRes.headers['set-cookie'] = sc.map(sc => {
        return sc
          .split(';')
          .filter(
            v =>
              v.trim().toLowerCase() !== 'secure' &&
              v.trim().toLowerCase() !== 'samesite=none'
          )
          .join('; ');
      });

      console.log(`after set-cookie: ${proxyRes.headers['set-cookie'][0]}`);
    }
  }
});

appProxy.all('/*', server);

var http = require('http').createServer(appProxy);
http.listen(3001, function () {
  console.log(
    `Proxy server running at http://${http.address().address}:${
      http.address().port
    }/`
  );
});

//---------------------------------------------------------

const appProxy2 = require('express')();
appProxy2.use((req, res, next) => {
  res
    .header('Accept', 'application/json')
    .header('Access-Control-Allow-Origin', '*');
  next();
});

appProxy2.options('/*', (req, res) => {
  res
    .header('X-Requested-With', 'XMLHttpRequest')
    .header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')
    .header('Access-Control-Allow-Credentials', true)
    .header(
      'Access-Control-Allow-Methods',
      'GET, POST, HEAD, PUT, DELETE, OPTIONS'
    )
    .header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
    )
    .status(200)
    .send('ok');
});
appProxy2.all('/*', server);

var http2 = require('http').createServer(appProxy2);
http2.listen(3003, '127.0.0.1', function () {
  console.log(
    `Proxy server running at http://${http2.address().address}:${
      http2.address().port
    }/`
  );
});
