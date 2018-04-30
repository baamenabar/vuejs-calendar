require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/dist', express.static(path.join(__dirname, 'dist')));

const moment = require('moment-timezone');
moment.tz.setDefault('UTC');
const serialize = require('serialize-javascript');
const events = [
    {title: 'Some event', date: moment('2018-02-06', 'YYYY-MM-DD')},
    {title: 'Some other event', date: moment('2018-02-12', 'YYYY-MM-DD')},
    {title: 'No event', date: moment('2018-03-14', 'YYYY-MM-DD')},
    {title: 'Cumpleaños Agustín', date: moment('2018-03-14', 'YYYY-MM-DD')},
    {title: 'Remember that', date: moment('2018-03-26', 'YYYY-MM-DD')},
];

let renderer;

app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
  const contentMarker = '<!--APP-->';
  if(renderer){
    renderer.renderToString({ events }, (err, html)=>{
      if(err) {
        console.log('there has been an error', err);
      } else {
        console.log('all good to render the html');
        res.send(template.replace(contentMarker, `
          <script> var __INITIAL_EVENTS__=${ serialize(events) }</script>
          ${html}
          `));
      }
    });
  } else {
    res.send('<p>Awaiting compilation ...</p><script src="/reload/reload.js"></script>')
  }
});


app.use(require('body-parser').json());
app.post('/event', (req, res)=>{
 console.log('we got it!!', req.body);
 events.push({
  ...req.body,
  date: moment(req.body.date),
 });
 res.sendStatus(200);
})

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  const reload = require('reload');
  const reloadServer = reload(server, app);
  require('./webpack-dev-middleware').init(app);
  require('./webpack-server-compiler').init((bundle) => {
    const needsReload = renderer === undefined;
    renderer = require('vue-server-renderer').createBundleRenderer(bundle);
    if(needsReload){
      reloadServer.reload();
    }
  });
}

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === 'development') {
    //require("open")(`http://localhost:${process.env.PORT}`);
    console.log('Should open a new browser but I dont want it to.')
  }
});
