import { Router } from 'express';
import { PostController } from './post.controller';
import { protect } from '../../../middleware/auth';

class PostRoutes {
   private static cntrl = new PostController();
   private static router = Router();

   public static create() {
      this.router.post('/post', protect, this.cntrl.createPost);

      this.router.get('/post/:id', protect, this.cntrl.getPost);

      this.router.put('/post/:id', protect, this.cntrl.updatePost);

      this.router.delete('/post/:id', protect, this.cntrl.deletePost);

      return this.router;
   }
}

export default PostRoutes.create();
