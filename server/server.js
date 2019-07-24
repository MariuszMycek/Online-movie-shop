const express = require('express');
const next = require('next');
const path = require('path');
const bodyParser = require('body-parser');
const dev = process.env.NODE_ENV !== 'production'; // true false
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); // part of next config
const mongoose = require('mongoose');
// const sslRedirect = require('heroku-ssl-redirect');

import serverConfig from './config';

import home from './routes/home.routes';
import product from './routes/product.routes';
import discount from './routes/discount.routes';
import filter from './routes/filter.routes';

mongoose.Promise = global.Promise;
mongoose.connect(serverConfig.mongoURL, { useNewUrlParser: true }, error => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

nextApp.prepare().then(() => {
  // express code here
  const app = express();
  // app.use(sslRedirect());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api', home);
  app.use('/api', product);
  app.use('/api', discount);
  app.use('/api', filter);
  app.get('/service-worker.js', (req, res) => {
    // Don't cache service worker is a best practice (otherwise clients wont get emergency bug fix)
    res.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    res.set('Content-Type', 'application/javascript');
    nextApp.serveStatic(req, res, path.resolve('./.next/service-worker.js'));
  });
  app.get('*', (req, res) => {
    return handle(req, res); // for all the react stuff
  });
  app.listen(serverConfig.port, err => {
    if (err) throw err;
    console.log(`Ready at http://localhost:${serverConfig.port}`); // eslint-disable-line no-console
  });
});
