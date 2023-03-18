const express = require('express');
require('dotenv').config();
const cors = require('cors');
require('./db/mongoose');
const authRouter = require('./routers/auth');
const orderRouter = require('./routers/order');

const app = express();

app.use(cors({ origin: '*', credential: true }))
app.use(express.json());

app.use('/auth', authRouter);
app.use('/orders', orderRouter);
app.get('/', (_req,res) => res.send('WellCome to Burger Builder!'));

const port = process.env.PORT;
app.listen(port, () => console.log('app is listening on',port));