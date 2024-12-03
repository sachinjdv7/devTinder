const express = require('express');

const app = express();
const PORT = 8082;

app.get('/user', (req, res) => {
  res.send({ name: 'sachin' });
});

app.post('/user', (req, res) => {
  res.send('data successfully saved in db');
});

app.delete('/user', (req, res) => {
  res.send('data successfully deleted in db');
});

app.use('/', (req, res) => {
  res.send('Welecome to express server 🚀');
});

app.listen(PORT, () => {
  console.log(`🚀 Express server is listening on ${PORT}`);
});
