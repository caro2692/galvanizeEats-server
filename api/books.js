const express = require('express');

const router = express.Router();

const queries = require('../db/queries.js');

router.get('/', (req,res)=>{
  queries.getAllBooks().then(book=>{
    res.json(book);
  });
});

module.exports = router;
