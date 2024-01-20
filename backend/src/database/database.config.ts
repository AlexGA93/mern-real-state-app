import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const mongooseURI: string = process.env.MONGO_URI!;

// * Asynchronouse function to export tothe main script
export const databaseConnection = async (): Promise<void> => {
  await mongoose
  .connect(
    mongooseURI,
    {
      directConnection: true,
      serverSelectionTimeoutMS: 2000
    }
    )
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err: Error) => console.error(err));
}
