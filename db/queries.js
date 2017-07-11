const knex = require('./knex');

module.exports = {
  getAllBooks(){
    return knex('book');
  },
  getAllAuthors(){
    return knex('author');
  }
};
