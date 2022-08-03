import 'dotenv/config';
import logger from 'morgan';
import routes from './routes'
const express  = require('express');
const cors = require('cors')

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(3003, () => console.log('Server is Open 🟢 http://localhost:3003'));
