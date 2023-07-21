const mongoose = require("mongoose")



const Blacklistschema = new mongoose.Schema({
    blacklist: {
        type: [String],
        default: []
    }

})


const Blacklistmodel = mongoose.model("blacklist", Blacklistschema)

module.exports = Blacklistmodel