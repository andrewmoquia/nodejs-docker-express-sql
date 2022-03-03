import { Router } from 'express';
import { PostController } from '../controller/post.controller';

export class PostRoutes {
   private static cntrl = new PostController();
   private static router = Router();

   public static create() {
      this.router.post('/post', this.cntrl.createPost);

      this.router.get('/post/:id', this.cntrl.getPost);

      this.router.put('/post/:id', this.cntrl.updatePost);

      this.router.delete('/post/:id', this.cntrl.deletePost);

      return this.router;
   }
}
