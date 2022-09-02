const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.get('/api/quotes/random', (req, res, next) => {
  const quoterandom = getRandomElement(quotes)
  res.send({ quote: quoterandom});
});

app.get('/api/quotes', (req, res, next) => {
  const person = req.query.person;
  if (!person){
    res.send({ quotes: quotes});
  } else {
    let filterQuotes = quotes.filter(quote => quote.person === person);
    res.send({ quotes: filterQuotes });
  }
});

app.post('/api/quotes', (req, res, next) => {
  const { quote, person } = req.query;
  if ( quote && person){
    const newQuote = { quote: quote, person: person };
  quotes.push(newQuote);
  res.status(200).send({ quote: newQuote });
  } else {
    res.status(404).send();
  }
});


app.use(express.static('public'));

app.listen(PORT);