const mongoose=require("mongoose")
require("dotenv").config()
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to Mongodb Atlas")
    } catch (error) {
        console.log("server error")
    }

}
module.exports={connect}