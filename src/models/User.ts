import {
  Schema, model, Model, Document,
} from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<IUser>('User', userSchema);

export default User;
