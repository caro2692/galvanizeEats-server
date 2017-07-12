const knex = require('./knex');

module.exports = {
  getAllBooks(){
    const promises = [
      knex('book')
    ];
    return Promise.all(promises)
      .then(results=>{
      const books = results[0];
        return Promise.all(
          books.map(book=>{
            return knex('book_author')
            .select('author_id', 'author.*')
            .innerJoin('author', 'author.id', 'book_author.author_id')
            .where('book_id', book.id)
            .then(author_ids=>{
              book.authors = author_ids;
              return book;
            });
          })
        );
      });

    //return knex('book').select('book_author.*', 'book.title', 'book.genre', 'book.description', 'book.cover_url', 'author.first_name', 'author.last_name', 'author.biography', 'author.portrait_url').innerJoin('book_author','book.id', 'book_author.book_id').innerJoin('author', 'author.id', 'book_author.author_id');
  },
  getAllAuthors(){
    return knex('author');
  }
};
