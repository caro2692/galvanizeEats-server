exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('author', function(table){
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.text('biography').notNullable();
    table.string('portrait_url').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('author');
};
