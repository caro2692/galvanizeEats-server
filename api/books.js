const express = require('express');

const router = express.Router();

const queries = require('../db/queries.js');

function isValidBook(book){
  const hasTitle = typeof book.title == 'string' && book.title.trim() != '';
  const hasGenre = typeof book.genre == 'string' && book.genre.trim() != '';
  const hasDescription = typeof book.description == 'string' && book.description.trim() != '';
  const hasURL = typeof book.cover_image == 'string' && book.cover_image.trim() != '';
  let errors = '';
  if(!hasTitle){
    errors += ' Title cannot be blank.';
  }
  if(!hasGenre){
    errors += ' Genre cannot be blank.';
  }

  if(!hasURL){
    errors += ' Please enter valid URL.';
  }

  if(!hasDescription){
    errors += ' Description cannot be blank.';
  }
  return !errors ? true : errors;
}

router.get('/', (req,res)=>{
  queries.getAllBooks().then(book=>{
    res.json(book);
  });
});

router.post('/new', (req, res, next) => {
  const errors = isValidBook(req.body);
  if(errors === true){
    queries.createBook(req.body).then(result => {
      res.send(result);
    });
  } else {
    next(new Error(errors));
  }
});

router.delete('/:id', (req, res, next) => {
      queries.deleteBook(req.params.id).then(result => {
        res.json(result);
      });
});

module.exports = router;
