const jwt = require("jsonwebtoken")
const blacklistmodel = require("../models/blacklistmodal")

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization

  let blacklistedtokens = await blacklistmodel.find()

  if (blacklistedtokens[0]?.blacklist.includes(token)) {
    console.log("token present")
    res.status(401).send({"msg":"You need to login to accesss this route"});
  } else {
    jwt.verify(token, "masai", (err, decoded) => {
      if (err) {
        res.send("you are not authorized to access")
      } else {
        console.log(decoded)
        req.userId = decoded.userId
        console.log(req.userId)
        next()
      }
    })
  }

}
module.exports = { authMiddleware }