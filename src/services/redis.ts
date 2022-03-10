import session from 'express-session';
import Redis from 'ioredis';
const RedisStore = require('connect-redis')(session);

class RedisSession {
   private ip: string | undefined;
   private port: string | undefined;
   private secret: string | undefined;

   constructor() {
      this.ip = process.env.REDIS_IP;
      this.port = process.env.REDIS_PORT;
      this.secret = process.env.SECRET_SESSION;
   }

   //Setup redis options
   private redisClient() {
      return new Redis({
         port: Number(this.port),
         host: this.ip,
         family: 4,
         db: 0,
         enableReadyCheck: true,
      });
   }

   //Create redis session
   public createSession() {
      return session({
         store: new RedisStore({ client: this.redisClient() }),
         saveUninitialized: false,
         resave: false,
         secret: this.secret || 'secret',
         cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 5, //5 minutes
         },
      });
   }
}

const redis = new RedisSession();

export default redis;
