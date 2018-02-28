const express = require("express");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);
const bcrypt = require('bcrypt');


app.set("port", process.env.PORT || 3000);

passport.use(
  new Strategy(
    {
      usernameField: "email"
    },
    function(email, password, done) {
      database("contributors")
        .where({ email })
        .first()
        .then(contributor => {
          if (!contributor) {
            return done(null, false);
          }
          if (!bcrypt.compareSync(password, contributor.password)) {
            return done(null, false);
          }
          return done(null, contributor);
        })
        .catch(error => {
          return done(error);
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  database("contributors")
    .where({ id })
    .first()
    .then(user => {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(error => {
      done(error);
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('express-session')({secret: 'cryptokitties', cookie: {}, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "build")));

app.locals.title = "BlockSource";

app.get("/", (request, response) => {
  response.send("BlockSource!");
});

app.post(
  "/api/v1/login",
  passport.authenticate("local"),
  (request, response) => {
    const reducedUser = {
      id: request.user.id,
      email: request.user.email
    };
    response.status(200).json(reducedUser);
  }
);

app.post("/api/v1/logout", (request, response) => {
  request.logout();
  response.redirect("/");
});

app.get("/api/v1/contributors/:id", (request, response) => {
  const { id } = request.params;

  database("contributors")
    .where({ id })
    .first()
    .then(contributor => {
      if (!contributor) {
        response.status(404).json({ error: "Not found" });
      } else {
        response.status(200).json(contributor);
      }
    })
    .catch(error => {
      response.status(422).json({ error });
    });
});

app.get("/api/v1/projects", (request, response) => {
  database("projects")
    .select()
    .then(projects => {
      if (!projects) {
        response.status(404).json({ error: "Not Found" });
      } else {
        response.status(200).json(projects);
      }
    })
    .catch(error => {
      response.status(422).json({ error });
    });
});

app.get("/api/v1/projects/:id", (request, response) => {
  const { id } = request.params;

  database("projects")
    .where({ id })
    .first()
    .then(project => {
      if (!project) {
        response.status(404).json({ error: "Not Found" });
      } else {
        response.status(200).json(project);
      }
    })
    .catch(error => {
      response.status(422).json({ error });
    });
});

app.get("/api/v1/contributors/:id/projects", (request, response) => {
  const { id } = request.params;

  if (!id) {
    return response.status(422).json({
      error: `You are missing id request param`
    });
  }

  database("projects")
    .join(
      "projects_contributors",
      "projects_contributors.projects_id",
      "=",
      "projects.id"
    )
    .where("projects_contributors.contributors_id", id)
    .select()
    .then(projects => {
      if (!projects[0]) {
        response.status(404).json({ error: "Not Found" });
      } else {
        response.status(200).json(projects);
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/projects/:id/contributors", (request, response) => {
  const { id } = request.params;

  if (!id) {
    return response.status(422).json({
      error: `You are missing id request param`
    });
  }

  database("contributors")
    .join(
      "projects_contributors",
      "projects_contributors.contributors_id",
      "=",
      "contributors.id"
    )
    .where("projects_contributors.projects_id", id)
    .select()
    .then(contributors => {
      if (!contributors[0]) {
        response.status(404).json({ error: "Not Found" });
      } else {
        response.status(200).json(contributors);
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

const checkUser = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  }
  return response.status(401).json({ error: "Unauthorized" });
};

app.post("/api/v1/projects", checkUser, (request, response) => {
  const project = request.body;

  for (const requiredParams of [
    "title",
    "goal_amount",
    "fund_amount",
    "description"
  ]) {
    if (!project[requiredParams]) {
      return response.status(422).json({
        error: `You are missing ${requiredParams}`
      });
    }
  }

  database("projects")
    .insert(project, "id")
    .then(project => response.status(201).json({ id: project[0] }))
    .catch(error => response.status(404).json({ error }));
});

app.post("/api/v1/contributors", (request, response) => {
  const contributor = request.body;

  for (const requiredParams of ["name", "bio"]) {
    if (!contributor[requiredParams]) {
      return response.status(422).json({
        error: `You are missing ${requiredParams}`
      });
    }
  }

  database("contributors")
    .insert(contributor, "id")
    .then(project => response.status(201).json({ id: project[0] }))
    .catch(error => response.status(404).json({ error }));
});

app.post("/api/v1/projects_contributors/project/", (request, response) => {
  const junction = request.body;

  for (const requiredParams of [
    "projects_id",
    "contributors_id",
    "owner",
    "contribution_amount"
  ]) {
    if (!junction[requiredParams]) {
      return response.status(422).json({
        error: `You are missing ${requiredParams}`
      });
    }
  }

  database("projects_contributors")
    .insert(junction, "projects_id")
    .then(project => response.status(201).json({ id: project[0] }))
    .catch(error => response.status(404).json({ error }));

  database("projects")
    .where("id", "=", junction.projects_id)
    .increment("fund_amount", junction.contribution_amount)
    .catch(error => {
      response.status(422).json({ error });
    });
});

app.patch("/api/v1/projects/:id", (request, response) => {
  const { id } = request.params;
  const { description } = request.body;

  database("projects")
    .where({ id })
    .update({ description })
    .then(project => {
      if (!project) {
        response.status(404).json({ error: "Not found" });
      } else {
        response.status(200).json(project);
      }
    })
    .catch(error => {
      response.status(422).json({ error });
    });
});

app.patch("/api/v1/contributors/:id", (request, response) => {
  const { id } = request.params;
  const { bio } = request.body;

  database("contributors")
    .where({ id })
    .update({ bio })
    .then(contributor => {
      if (!contributor) {
        response.status(404).json({ error: "Wallet not found" });
      } else {
        response.status(200).json(contributor);
      }
    })
    .catch(error => {
      response.status(422).json({ error });
    });
});

app.listen(app.get("port"), () => {
  /* eslint-disable no-console */
  console.log(
    `${app.locals.title} is running on ${app.get("port")}. env: ${environment}`
  );
});

module.exports = app;
