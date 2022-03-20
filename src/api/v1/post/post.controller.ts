import { RequestHandler } from 'express';
import Post from './post.model';

export class PostController {
   public createPost: RequestHandler = async (req, res) => {
      try {
         const { title, body } = req.body;

         const newPost = await new Post({ title, body });
         if (!newPost) return res.json({ message: 'Failed to create post.' });

         const savePost = newPost.save();
         return savePost ? res.json({ newPost }) : res.json({ message: 'Failed to create post.' });
      } catch (error) {
         return res.json({ error });
      }
   };

   public getPost: RequestHandler = async (req, res) => {
      try {
         const { id } = req.params;

         const post = await Post.findById(id);
         post ? res.json({ post }) : res.json({ message: 'Failed to find post.' });
      } catch (error) {
         res.json({ error });
      }
   };

   public updatePost: RequestHandler = async (req, res) => {
      try {
         const { id } = req.params;
         const { title, body } = req.body;

         const post = await Post.findByIdAndUpdate(id, { title, body });
         post
            ? res.json({ message: 'Successfully updated post.' })
            : res.json({ message: 'Failed to update post.' });
      } catch (error) {
         res.json({ error });
      }
   };

   public deletePost: RequestHandler = async (req, res) => {
      try {
         const { id } = req.params;

         const post = await Post.findByIdAndDelete(id);
         post
            ? res.json({ message: 'Successfully deleted post.' })
            : res.json({ message: 'Failed to delete post.' });
      } catch (error) {
         res.json({ error });
      }
   };
}
