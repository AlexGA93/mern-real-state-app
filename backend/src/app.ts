import express, { Express, Request, Response, json } from 'express';
import cors from 'cors';
import { databaseConnection } from './database/database.config';
import testRouter from './routes/test.route';

databaseConnection();

const app: Express = express();

// config
app.use(cors());
app.use(express.json());

// routes
app.use('/api', testRouter);

export default app;