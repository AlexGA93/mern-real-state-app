import express, { Express } from 'express';
import cors from 'cors';
import { databaseConnection } from './database/database.config';

databaseConnection();

const app: Express = express();

app.use(cors());
app.use(express.json());

export default app;