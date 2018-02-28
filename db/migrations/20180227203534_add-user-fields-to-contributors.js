exports.up = function(knex, Promise) {
  return knex.schema.table('contributors', function(table) {
    table.string('email');
    table.string('password');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('contributors', function(table) {
    table.dropColumn('email');
    table.dropColumn('password');
  })
};
