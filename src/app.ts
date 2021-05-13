import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello SamuelNayo!')
});

const { PORT = 5000 } = process.env

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
