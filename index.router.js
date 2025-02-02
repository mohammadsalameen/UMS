import { connectionDB } from './DB/connection.js';
import userRouter from './src/modules/user/user.router.js';
import authRouter from "./src/modules/authentication/authentication.router.js";
import blogRouter from "./src/modules/blog/blog.router.js";
const initApp = (app, express) => {
  connectionDB();
  app.use(express.json());
  app.use("/users", userRouter);
  app.use("/auth", authRouter);
  //localhost:6001/blogs
  app.use("/blogs", blogRouter);

  app.use((err, req, res, next) =>{
    return res.status(err.statusCode).json({message : err.message});
  })
};

export default initApp;
