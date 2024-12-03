const express = require('express');

const app = express();
const PORT = 8082;

// multiple route handlers

app.get('/user', [
  (req, res, next) => {
    console.log('first handler');
    // res.send('1 response');
    next();
  },
  (req, res, next) => {
    console.log('second handler');
    res.send('2 response');
    // next();
  },
]);

app.listen(PORT, () => {
  console.log(`🚀 Express server is listening on ${PORT}`);
});
