import session from 'express-session';
import Redis from 'ioredis';
const RedisStore = require('connect-redis')(session);

export class RedisSession {
   private static IP = process.env.REDIS_IP;
   private static PORT = process.env.REDIS_PORT;
   private static SECRET = process.env.SECRET_SESSION;

   //Setup redis options
   private static redisClient() {
      return new Redis({
         port: Number(this.PORT),
         host: this.IP,
         family: 4,
         db: 0,
         enableReadyCheck: true,
      });
   }

   //Create redis session
   public static createSession() {
      return session({
         store: new RedisStore({ client: this.redisClient() }),
         saveUninitialized: false,
         resave: false,
         secret: this.SECRET || 'secret',
         cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 5, //5 minutes
         },
      });
   }
}
