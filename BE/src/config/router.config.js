const router = require('express').Router();

const userRouter = require("../modules/user/user.router")

router.use("/user",userRouter)

module.exports = router