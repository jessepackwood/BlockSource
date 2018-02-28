/*eslint camelcase: ["error", {properties: "never"}]*/

const bcrypt = require("bcrypt");
const projectsData = require("../projectsData");
const contributorsData = require("../contributorsData");
const projectsContributorsData = require("../projectsContributorsData");

exports.seed = function(knex) {
  return knex("projects_contributors")
    .del()
    .then(() => knex("contributors").del())
    .then(() => knex("projects").del())
    .then(() => {
      return knex("projects")
        .insert(projectsData, "id")
        .then(projectsIds => {
          let hashedContributorsData = [];
          contributorsData.forEach(contributor => {
            let hash = bcrypt.hashSync(contributor.password, 10);
            hashedContributorsData.push(
              Object.assign({}, contributor, { password: hash })
            );
          });
          return knex("contributors")
            .insert(hashedContributorsData, "id")
            .then(contributorsIds => {
              let projectsContributorsWithIDs = [];
              console.log(projectsIds);
              projectsContributorsData.forEach((junction) => {
                projectsContributorsWithIDs.push(
                  Object.assign({}, junction, {
                    projects_id:
                      projectsIds[
                        Math.floor(
                          Math.random() * Math.floor(projectsIds.length)
                        )
                      ],
                    contributors_id:
                      contributorsIds[
                        Math.floor(
                          Math.random() * Math.floor(contributorsIds.length)
                        )
                      ]
                  })
                );
              });
              console.log(projectsContributorsWithIDs);
              return knex("projects_contributors").insert(
                projectsContributorsWithIDs
              );
            });
        })
        .then(() => console.log("Seeding complete!"))
        .catch(error => console.log(`Error seeding data: ${error}`));
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
