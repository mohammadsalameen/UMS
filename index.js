import express from 'express'
import { connectionDB } from './DB/connection.js'       
import userRouter from './src/modules/user/user.router.js'
import authRouter from './src/modules/authentication/authentication.router.js'
const app = express();
app.use(express.json());
const PORT = 6001;
connectionDB();
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => console.log(`server is running .... at ${PORT}`));


