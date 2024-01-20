import express, { Express, NextFunction, Request, Response, json } from 'express';
import cors from 'cors';
import { databaseConnection } from './database/database.config';
import testRouter from './routes/test.route';
import signUp from './routes/auth.route';

databaseConnection();

const app: Express = express();

// config
app.use(cors());
app.use(express.json());

// middleware - error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = err.statusCode || 500;
  const message: string = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
});

// routes
app.use('/api/test', testRouter);
app.use('/api/auth', signUp);


export default app;