import { Request, Response, NextFunction, RequestHandler } from 'express';

export type ResponseError = Error & { status: number };

export class ErrorHandling {
   public static catch() {
      return (error: ResponseError, req: Request, res: Response, next: NextFunction) => {
         res.status(error.status || 500);
         res.json({
            error: {
               message: error.message,
            },
         });
      };
   }
}
