import glob from 'glob';
import { Router } from 'express';

//Combined all routes into one variable
const Routers = glob
   //Check all files in the current directory
   .sync(`**/*.${process.env.NODE_ENV === 'production' ? 'js' : 'ts'}`, {
      cwd: `${__dirname}/`,
   })
   //Get all export in every files
   .map((filename: string) => require(`./${filename}`))
   //Filter out data that is not router
   .filter((router: any) => router.default && Object.getPrototypeOf(router.default) === Router)
   //Merge routers
   .reduce((rootRouter: Router, router: any) => {
      return rootRouter.use(router.default);
   }, Router({ mergeParams: true }));

export default Routers;
