const express = require('express');
const { auth, userAuth } = require('./middlewares/auth.middleware');

const app = express();
const PORT = 8082;

app.use('/admin', auth);

app.get('/user', userAuth, (req, res) => {
  try {
    throw new Error();
    res.send('user data send');
  } catch (error) {
    res.status(500).send('something went from try catch');
  }
});

app.get('/admin/getData', (req, res) => {
  res.send('data get successfully..');
});

app.delete('/admin/deleteData', (req, res) => {
  res.send('successfully deleted the data');
});

app.use('/', (err, req, res, next) => {
  if (err) {
    res.status(500).send('something went wrong');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Express server is listening on ${PORT}`);
});
