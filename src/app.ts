import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Database } from './services/database';
import { RedisSession } from './services/redis';
import { ErrorHandler } from './middleware/errorHandler';
import Routers from './api/index';

export class App {
   private static app = express();
   private static port = process.env.PORT;
   private static origin = process.env.ORIGIN;
   private static cookieSecret = process.env.COOKIE_SECRET;

   public static start() {
      //Allow test in localhost:3000.
      this.app.set('trust proxy', 1);

      //Necessary to get access to ip for rate limiting.
      this.app.enable('trust proxy');

      //Connect to the database.
      Database.connect();

      //Create redis server session
      this.app.use(RedisSession.createSession());

      //Site that allow to make request in API.
      this.app.use(
         cors({
            origin: this.origin,
            credentials: true,
         })
      );

      //Recognize the incoming Request Object as a JSON Object.
      this.app.use(express.json());

      //Parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays.
      this.app.use(express.urlencoded({ extended: false }));

      //Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
      this.app.use(cookieParser(this.cookieSecret));

      //Add 11 layer of security.
      //https://helmetjs.github.io/
      this.app.use(helmet());

      //Handle routes.
      this.app.use('/app/v1', Routers);
      this.app.get('/app/vi', (req, res) => {
         res.send('<h1>Hello World!!!!</h1>');
         console.log('Running');
      });

      //Handle catching error responds.
      this.app.use(ErrorHandler.catch());

      //Initiate the server app.
      this.app.listen(this.port, () => {
         console.log(`Server is up at http://localhost:${this.port}`);
      });
   }
}
