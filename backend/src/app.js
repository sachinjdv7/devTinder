const express = require('express');

const app = express();
const PORT = 8082;

app.get('/', (req, res) => {
  res.send('Welecome to express server 🚀');
});

app.get('/test', (req, res) => {
  res.send('Testing test route...');
});

app.listen(PORT, () => {
  console.log(`🚀 Express server is listening on ${PORT}`);
});
