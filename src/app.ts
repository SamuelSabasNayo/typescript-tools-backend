import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello SamuelNayo!')
});

app.all('*', (req, res) => {
  return res.status(404).json(`Can't find ${req.originalUrl} path on this server!`);
});

const { PORT = 5000 } = process.env

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
