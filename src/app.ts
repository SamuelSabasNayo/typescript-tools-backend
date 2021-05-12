import express from 'express';

const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello SamuelNayo!')
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
