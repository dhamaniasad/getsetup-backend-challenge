export const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/getsetup-backend';
export const PORT: number = Number(process.env.PORT) || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_EXPIRATION = 360000;

