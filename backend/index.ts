import { NextFunction, Request, Response } from 'express';
import app from './src/app';
import { config } from 'dotenv';
config();

const PORT: number | string = 3000 || process.env.PORT;

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

app.listen(
  PORT,
  () => console.log(`Server listening at port: ${PORT}`)
);