import mongoose from 'mongoose';

class Database {
   private user: string | undefined;
   private pw: string | undefined;
   private ip: string | undefined;
   private port: string | undefined;

   constructor() {
      this.user = process.env.MONGO_USER;
      this.pw = process.env.MONGO_PASS;
      this.ip = process.env.MONGO_IP;
      this.port = process.env.MONGO_PORT;
   }

   public connect() {
      mongoose
         .connect(`mongodb://${this.user}:${this.pw}@${this.ip}:${this.port}/?authSource=admin`)
         .then(() => {
            console.log('Successfully connected to the mongo database.');
         })
         .catch((err) => {
            console.log(err);
            //Reconnect to the server if failed every 5 secs.
            setTimeout(this.connect, 5000);
         });
   }
}

export const db = new Database();
