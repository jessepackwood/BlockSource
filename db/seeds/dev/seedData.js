const projectsData = [
  {
    title: "Black Project",
    description: "Really really black, like so black it kills you",
    goal_amount: 50000.0,
    fund_amount: 20000.0
  },
  {
    title: "Green Project",
    description: "Really really green, like so green it kills you",
    goal_amount: 50000.0,
    fund_amount: 20000.0
  },
  {
    title: "Blue Project",
    description: "Really really blue, like so blue it kills you",
    goal_amount: 50000.0,
    fund_amount: 20000.0
  },
  {
    title: "Brown Project",
    description: "Really really brown, like so brown it kills you",
    goal_amount: 50000.0,
    fund_amount: 20000.0
  },
  {
    title: "Grey Project",
    description: "Really really grey, like so grey it kills you",
    goal_amount: 50000.0,
    fund_amount: 20000.0
  }
];

const contributorsData = [
  { name: "Jesse", bio: "Daredevil, LadiesMan, Photographer, Programmer" },
  { name: "JPack", bio: "Daredevil, LadiesMan, Photographer, Programmer" },
  { name: "JMoney", bio: "Daredevil, LadiesMan, Photographer, Programmer" },
  { name: "JP", bio: "Daredevil, LadiesMan, Photographer, Programmer" },
  { name: "Jay", bio: "Daredevil, LadiesMan, Photographer, Programmer" }
];

const projectsContributorsData = [
  {
    projects_id: 1,
    contributors_id: 1,
    owner: true,
    contribution_amount: 0.0
  },
  {
    projects_id: 2,
    contributors_id: 1,
    owner: true,
    contribution_amount: 0.0
  },
  {
    projects_id: 3,
    contributors_id: 1,
    owner: true,
    contribution_amount: 0.0
  },
  {
    projects_id: 4,
    contributors_id: 1,
    owner: true,
    contribution_amount: 0.0
  },
  {
    projects_id: 5,
    contributors_id: 2,
    owner: true,
    contribution_amount: 0.0
  },
  {
    projects_id: 1,
    contributors_id: 2,
    owner: false,
    contribution_amount: 20000.0
  },
  {
    projects_id: 2,
    contributors_id: 3,
    owner: false,
    contribution_amount: 10000.0
  },
  {
    projects_id: 2,
    contributors_id: 4,
    owner: false,
    contribution_amount: 10000.0
  },
  {
    projects_id: 3,
    contributors_id: 1,
    owner: false,
    contribution_amount: 10000.0
  },
  {
    projects_id: 3,
    contributors_id: 5,
    owner: false,
    contribution_amount: 10000.0
  },
  {
    projects_id: 3,
    contributors_id: 5,
    owner: false,
    contribution_amount: 10000.0
  },
  {
    projects_id: 4,
    contributors_id: 5,
    owner: false,
    contribution_amount: 10000.0
  },
  {
    projects_id: 4,
    contributors_id: 4,
    owner: false,
    contribution_amount: 10000.0
  },
  {
    projects_id: 5,
    contributors_id: 3,
    owner: false,
    contribution_amount: 20000.0
  }
];

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function() {
      return knex.raw("ALTER SEQUENCE projects_id_seq RESTART WITH 1");
    })
    .then(() => knex('contributors').del())
    .then(function() {
      return knex.raw("ALTER SEQUENCE contributors_id_seq RESTART WITH 1");
    })
    .then(() => knex('projects_contributors').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert(projectsData, 'id')
          .then(() => {
            return knex('contributors').insert(contributorsData, 'id');
          })
          .then(() => {
            return knex('projects_contributors').insert(projectsContributorsData);
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]); // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
