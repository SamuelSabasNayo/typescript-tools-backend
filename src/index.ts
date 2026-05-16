import "reflect-metadata";
import express from 'express';
import connectDB from "typeorm";
import userRoutes from './routes/user.routes';

const app = express();
const PORT = process.env.PORT || 5000;
connectDB;


app.use(express.json());
app.use('/users', userRoutes);
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});