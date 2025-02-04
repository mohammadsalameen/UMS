import express from 'express'
import initApp from './index.router.js'
const app = express();
const PORT = 6000;

initApp(app, express);

app.listen(PORT, () => console.log(`server is running .... at ${PORT}`));


