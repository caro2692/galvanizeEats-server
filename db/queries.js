const knex = require('./knex');
const moment = require('moment');

module.export = {
  getAllBooks(){
    return knex('book');
  },
  getAllAuthors(){
    return knex('author');
  }
};
