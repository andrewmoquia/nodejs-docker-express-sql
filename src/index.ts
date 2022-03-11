import { App } from './app';
import dotenv from 'dotenv';

//Loads environment variables from a ".env" file into "process.env".
dotenv.config();

//Start the server app.
App.start();
