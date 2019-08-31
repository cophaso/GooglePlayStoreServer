const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const apps= require('./playstore.js');

app.get('/apps', (req, res) => {
  const {sort, genre=''} = req.query;

  const genreArr = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  if(sort) {
    if(!['Rating', 'App'].includes(sort)){
      return res.status(400).send('Sort must be Rating or App')
    }
  }

  if(genre) {
    if(!genreArr.includes(genre)){
      return res.status(400).send('Genre must be Action, Puzzle, Strategy, Casual, Arcade or Card')
    }
  }

  let results = apps

  if(sort) {
    results
      .sort((a, b) => {
        return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
    }); 
  }

  if(genre) {
     results = results.filter(app => app.Genres.includes(genre));
  }

  res.json(results);
})

app.listen(8000, () => {
  console.log('Server started on PORT 8000')
})