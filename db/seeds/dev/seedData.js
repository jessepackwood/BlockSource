const bcrypt = require("bcrypt");
const projectsData = require("../projectsData");
const contributorsData = require("../contributorsData");
const projectsContributorsData = require("../projectsContributorsData");

exports.seed = function(knex, Promise) {
  return knex("projects_contributors")
    .del()
    .then(() => knex("contributors").del())
    .then(() => knex("projects").del())
    .then(() => {
      return knex("projects")
        .insert(projectsData, "id")
        .then(project_ids => {
          let hashedContributorsData = [];
          contributorsData.forEach(contributor => {
            let hash = bcrypt.hashSync(contributor.password, 10);
            hashedContributorsData.push(
              Object.assign({}, contributor, { password: hash })
            );
          });
          return knex("contributors")
            .insert(hashedContributorsData, "id")
            .then(contributor_ids => {
              let projectsContributorsWithIDs = [];
              console.log(project_ids);
              projectsContributorsData.forEach((junction, index) => {
                projectsContributorsWithIDs.push(
                  Object.assign({}, junction, {
                    projects_id:
                      project_ids[
                        Math.floor(
                          Math.random() * Math.floor(project_ids.length)
                        )
                      ],
                    contributors_id:
                      contributor_ids[
                        Math.floor(
                          Math.random() * Math.floor(contributor_ids.length)
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
