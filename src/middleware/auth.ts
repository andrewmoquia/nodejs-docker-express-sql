import { RequestHandler } from 'express';
import { AuthRequest } from '../api/v1/user/user.controller';

export const protect: RequestHandler = (req: AuthRequest, res, next) => {
   //Get user data from session
   const { user } = req.session;

   if (!user) {
      return res.status(401).json({ status: 'fail', message: 'Unauthorize.' });
   }

   //Set user to request
   req.user = user;

   //Proceed to the next action
   return next();
};
