const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'build')));

app.locals.title = 'BlockSource';

app.get('/', (request, response) => {
  response.send('BlockSource!');
});

app.get('/api/v1/contributors/:id', (request, response) => {
  const { id } = request.params;

  database('contributors').where({ id }).first()
    .then((contributor) => {
      if (!contributor) {
        response.status(404).json({ error: 'Not found'});
      } else {
        response.status(200).json(contributor);  
      }
    })
    .catch((error) => {
      response.status(422).json({ error });
    });
});

app.get('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params;

  database('projects').where({ id }).first()
    .then((project) => {
      if (!project) {
        response.status(404).json({ error: 'Not Found'});
      }

      response.status(200).json(project);
    })
    .catch((error) => {
      response.status(422).json({ error });
    });
});

app.get('/api/v1/contributors/:id/projects', (request, response) => {
  const { id } = request.params;

  database("projects")
    .join("projects_contributors", "projects_contributors.projects_id", "=", "projects.id")
    .where("projects_contributors.contributors_id", request.params.id)
    .select()
    .then(projects => response.status(200).json(projects))
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/projects/:id/contributors', (request, response) => {
  const { id } = request.params;

  database("contributors")
    .join("projects_contributors", "projects_contributors.contributors_id", "=", "constributors.id")
    .where("projects_contributors.projects_id", request.params.id)
    .select()
    .then(contributors => response.status(200).json(contributors))
    .catch(error => {
      response.status(500).json({ error });
    });
});



app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log(`${app.locals.title} is running on ${app.get('port')}. env: ${environment}`);
});

module.exports = app;