import express, { Express } from 'express';
import cors from 'cors';
import { databaseConnection } from './database/database.config';
import testRouter from './routes/test.route';
import signUp from './routes/auth.route';

databaseConnection();

const app: Express = express();

// config
app.use(cors());
app.use(express.json());

// routes
app.use('/api/test', testRouter);
app.use('/api/auth', signUp);


export default app;