import { model, Schema } from 'mongoose';

const userScheme = new Schema({
   username: {
      type: String,
      unique: true,
      require: [true, 'User must have username.'],
   },
   password: {
      type: String,
      require: [true, 'User must have password.'],
   },
});

const User = model('user', userScheme, 'user');

export default User;
