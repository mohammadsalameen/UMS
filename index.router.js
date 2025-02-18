import { connectionDB } from './DB/connection.js';
import userRouter from './src/modules/user/user.router.js';
import authRouter from "./src/modules/authentication/authentication.router.js";
import blogRouter from "./src/modules/blog/blog.router.js";
import cors from 'cors';
import { AppError } from './utils/AppError.js';
const initApp = (app, express) => {
  connectionDB();
  app.use(cors());
  app.use(express.json());
  app.use("/users", userRouter);
  app.use("/auth", authRouter);
  app.use("/blogs", blogRouter);
  app.use('/', (req, res)=>{
  return res.status(200).json("Welcome");
  });
  app.use('*', (req, res, next) =>{
    return next(new AppError("page not found", 404));
  });
  app.use((err, req, res, next) =>{
    return res.status(err.statusCode).json({message : err.message});
  });
};
export default initApp;
