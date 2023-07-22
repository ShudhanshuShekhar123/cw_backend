const express = require("express")
const cors=require("cors")
const mongoose = require("mongoose")
const cors = require("cors")
const server = express()
require("dotenv").config()
const { connect } = require("./config/db")
server.use(express.json())
server.use(cors({ origin:"*"}))

const { authMiddleware } = require("./middleware/auth.middleware")
const { userRouter } = require("./routes/user.route")
const exerciseroute = require("./routes/Exerciseroutes")

const adminroute = require("./routes/adminroute")


server.use(cors({
    origin:"*"
}))



server.get("/", (req, res) => {
    res.send("wwelcome to home page")
})


server.use("/user", userRouter)
server.use("/fitness", exerciseroute)
server.use("/admin",adminroute)



server.listen(process.env.PORT, () => {
    console.log(`listening at port ${process.env.PORT}`)
    connect()
})
