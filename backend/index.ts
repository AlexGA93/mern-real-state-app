import app from './src/app';
import { config } from 'dotenv';
config();

const PORT: number | string = 3000 || process.env.PORT;

app.listen(
  PORT,
  () => console.log(`Server listening at port: ${PORT}`)
);