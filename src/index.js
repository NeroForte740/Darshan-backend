import express from 'express';

import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);



app.listen(3838, () => console.log('server started! http://localhost:3838'));
