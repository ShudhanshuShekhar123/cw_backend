const express = require("express")
const mongoose = require("mongoose")
const server = express()
require("dotenv").config()
const {connect}=require("./config/db")
const exercisemodal = require("./exercisemodal")
server.use(express.json())
const {authMiddleware}=require("./middleware/auth.middleware")
const {userRouter}=require("./routes/user.route")
server.get("/", (req, res) => {
    res.send("wwelcome to home page")
})
server.use("/user",userRouter)
// server.get("/fitness", async (req, res) => {

//     const exercises = await exercisemodal.find()
//     res.send(exercises)

// })




server.listen(process.env.PORT, () => {
    console.log(`listening at port ${process.env.PORT}`)
    connect()
})
