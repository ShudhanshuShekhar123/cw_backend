const express = require("express")
const mongoose = require("mongoose")
const server = express()
require("dotenv").config()
const exercisemodal = require("./exercisemodal")

server.use(express.json())




server.get("/", (req, res) => {
    res.send("wwelcome to home page")
})

server.get("/fitness", async (req, res) => {

    const exercises = await exercisemodal.find()
    res.send(exercises)

})







const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to Mongodb Atlas")
    } catch (error) {
        console.log("server error")
    }

}



server.listen(process.env.PORT, () => {
    console.log(`listening at port ${process.env.PORT}`)
    connect()
})
