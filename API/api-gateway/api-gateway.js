const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');

app.use(logger('dev'));

function selectProxyHost(req) {
    if (req.path.startsWith('/Alarme'))
        return 'http://localhost:8080/';
    else if (req.path.startsWith('/ParamAlarme'))
        return 'http://localhost:8081/';
}

app.use((req, res, next) => {
    httpProxy(selectProxyHost(req))(req, res, next);
});

app.listen(8000, () => {
    console.log('API Gateway iniciado!');
});