import { RequestHandler, Request } from 'express';
import { AuthRequest } from '../controller/user.controller';

export const protect: RequestHandler = (req: AuthRequest, res, next) => {
   const { user } = req.session;

   if (!user) {
      return res.status(401).json({ status: 'fail', message: 'Unauthorize.' });
   }

   req.user = user;

   return next();
};
