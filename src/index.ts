import dotenv from 'dotenv';
import logger from 'morgan';
const express  = require('express');

dotenv.config();
const app= express;
app.use(express.json());
app.use(logger('dev'));
app.listen(3003, () => console.log('Server is Open 🎇 http://localhost:3003'));
