import mongoose from 'mongoose';

export class Database {
   private static USER = process.env.MONGO_USER;
   private static PASS = process.env.MONGO_PASS;
   private static IP = process.env.MONGO_IP;
   private static PORT = process.env.MONGO_PORT;

   //Create mongoose connection to mongo.
   public static connect() {
      mongoose
         .connect(`mongodb://${this.USER}:${this.PASS}@${this.IP}:${this.PORT}/?authSource=admin`)
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
