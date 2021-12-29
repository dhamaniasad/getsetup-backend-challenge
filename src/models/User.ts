import {
  Schema, model, Model, Document,
} from 'mongoose';

interface User extends Document {

}

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = model<User>('User', userSchema);

export default User;
