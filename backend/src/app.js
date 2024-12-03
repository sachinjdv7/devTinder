const express = require('express');

const app = express();
const PORT = 8082;

app.use('/hello/2', (req, res) => {
  res.send('abrakadabra');
});

app.use('/hello', (req, res) => {
  res.send('heloo helooo');
});

app.use('/test', (req, res) => {
  res.send('Testing test route...');
});

app.use('/', (req, res) => {
  res.send('Welecome to express server 🚀');
});

app.listen(PORT, () => {
  console.log(`🚀 Express server is listening on ${PORT}`);
});
