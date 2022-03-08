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

   public createSession() {
      const redisClient = new Redis({
         port: Number(this.port),
         host: this.ip,
         family: 4,
         db: 0,
         enableReadyCheck: true,
      });

      return session({
         store: new RedisStore({ client: redisClient }),
         saveUninitialized: false,
         resave: false,
         secret: this.secret || 'secret',
         cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 5,
         },
      });
   }
}

const redis = new RedisSession();

export default redis;
