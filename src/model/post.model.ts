import { model, Schema } from 'mongoose';

const postSchema = new Schema({
   title: {
      type: String,
      require: [true, 'Post must have title.'],
   },
   body: {
      type: String,
      require: [true, 'Post must have title.'],
   },
});

const Post = model('post', postSchema, 'post');

export default Post;
