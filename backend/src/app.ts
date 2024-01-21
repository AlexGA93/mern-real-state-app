import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { databaseConnection } from './database/database.config';
import { test, auth, user } from './routes';


databaseConnection();

const app: Express = express();

// config
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/test', test);
app.use('/api/user', user);
app.use('/api/auth', auth);


export default app;