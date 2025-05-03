const express = require('express');
const { signup, signin, updateuser } = require('../controler/User');
const { newsletter, sendnewsletter, getNewsletter } = require('../controler/newsletter');
const isauth = require('../middleware/isauth');

const userRouter = express.Router();
userRouter.post("/signup",signup)
userRouter.post("/signin",signin)
userRouter.post("/subscribe",newsletter)
userRouter.post("/sendnewsletter",isauth,sendnewsletter)
userRouter.get("/getnewsletter",isauth,getNewsletter)
userRouter.put("/updateuser/:id",isauth,updateuser)
module.exports = userRouter