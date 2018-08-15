const { Nuxt, Builder } = require('nuxt');
const express = require('express');
const app = express();

const host = '0.0.0.0';
const port = 3000;

app.set('port', port);

const isProd = process.env.NODE_ENV === 'production';

const config = require('../nuxt.config.js');
config.dev = !isProd;

const nuxt = new Nuxt(config);
const promise = isProd ? Promise.resolve() : new Builder(nuxt).build();

promise
  .then(() => {
    app.use(nuxt.render);
    app.listen(port, host);
    console.log('Server listening on ' + host + ':' + port);
  })
  .catch(error => {
    console.error(error);
});
