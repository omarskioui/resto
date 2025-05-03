const express = require('express');
const cors = require('cors');
const configurations = require('./config/config');
const userRouter = require('./router/user');
const productRouter = require('./router/product');
const reservationRouter = require('./router/reservation');

const app = express();
app.use(express.json());
const port =  5000;
app.use(cors({origin: "http://localhost:3000"}));
app.use("/",userRouter)
app.use("/product",productRouter)
app.use("/reservation",reservationRouter)
configurations();
app.listen(port , console.log(`server is running on port ${port}`));

