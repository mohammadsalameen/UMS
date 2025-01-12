import express from 'express'
import { connectionDB } from './DB/connection.js'       
import userRouter from './src/modules/user/user.js'
const app = express();
app.use(express.json());
const PORT = 4000;
connectionDB();
app.use('/users', userRouter);

app.listen(PORT, () => console.log(`server is running .... at ${PORT}`));


