const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'BlockSource';

app.get('/', (request, response) => {
  response.send('BlockSource!')
})

app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log(`${app.locals.title} is running on ${app.get('port')}. env: ${environment}`);
});

module.exports = app;