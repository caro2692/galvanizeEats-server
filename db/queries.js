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
  },
  getAllAuthors(){
    return knex('author');
  },
  deleteBook(id){
    return knex('book').where('id', id).delete();
  },
  createBook(book){
    const new_book = {
      title: book.title,
      genre: book.genre,
      cover_url: book.cover_image,
      description: book.description
    };
    return knex('book').insert(new_book,'*')
    .then(results=>{
      const book_id = results[0].id;
      let authors =book['authors[]'];
      console.log(authors);
      const book_authors = authors.map(author_id=>{
        return {
          book_id,
          author_id
        };
      });
      return knex('book_author')
      .insert(book_authors)
      .then((response)=>{
        return results[0];
      });
    });
  }
};
