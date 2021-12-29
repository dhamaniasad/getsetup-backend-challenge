import { ConnectOptions, connect, Error } from 'mongoose';
import { MONGO_URI } from './index';

const connectDB = async () => {
  try {
    const mongoURI = MONGO_URI;
    const options: ConnectOptions = {
      autoCreate: true,
      serverSelectionTimeoutMS: 1000,
    };
    await connect(mongoURI, options);
    console.log('MongoDB Connected...');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
