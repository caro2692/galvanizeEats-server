exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('book_author', function(table){
    table.increments('id').primary();
    table.integer('book_id').unsigned();
    table.integer('author_id').unsigned();
    table.foreign('book_id').references('book.id').onDelete('cascade');
    table.foreign('author_id').references('author.id').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('book_author');
};
