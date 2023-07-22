const jwt = require("jsonwebtoken")
const blacklistmodel = require("../models/blacklistmodal")

const adminauthmiddleware = async (req, res, next) => {
    const token = req.headers.authorization

    let blacklistedtokens = await blacklistmodel.find()

    if (blacklistedtokens[0]?.blacklist.includes(token)) {
        console.log("token present")
        res.status(401).send({ "msg": "You need to login to accesss this admin private route, Token in blaclist" });
    } else {
        jwt.verify(token, "admin", (err, decoded) => {
            if (err) {
                res.send("you are not authorized to access")
            } else {
                console.log(decoded)
                req.userId = decoded.userId

                next()
            }
        })
    }

}
module.exports =  adminauthmiddleware 