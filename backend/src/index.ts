import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

const PORT: number | string = 3000 || process.env.PORT;

app.listen(
  PORT,
  () => console.log(`Server listening at port: ${PORT}`)
);