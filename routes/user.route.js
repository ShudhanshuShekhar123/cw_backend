const { Router } = require("express")
const userRouter = Router()
const { authMiddleware } = require("../middleware/auth.middleware")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { userModel } = require("../models/user.model")
const blacklistmodel = require("../models/blacklistmodal")
userRouter.post("/register", async (req, res) => {
  const { name, password, gender, subscription, age, email } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 5)
    if (hashedPassword) {
      const user = await userModel.create({ name, password: hashedPassword, gender, subscription, age, email })
      console.log(user)
      return res.status(200).json(user)
    } else {
      res.send(`You are not registered properly`)
    }
  } catch (err) {
    console.log(err.message)
    res.send(err.message)
  }
})
userRouter.post("/login", async (req, res) => {
  const { password, email } = req.body
  try {
    const user = await userModel.find({ email })
    if (user) {
      const decoded = bcrypt.compare(password, user[0].password)
      if (decoded) {
        const token = jwt.sign({ userId: user[0]._id }, "masai")
        return res.status(201).json({ user, token })
      } else {
        res.send(`wrong password`)
      }
    } else {
      res.send(`User not found`)
    }
  } catch (err) {
    res.send("you are not authorized")
  }
})
userRouter.patch("/subscribe/:id", authMiddleware, async (req, res) => {
  const { id } = req.params
  try {
    const user = await userModel.find({ _id: id })
    console.log(user)
    if (user) {
      if (id === req.userId) {
        const updatedUser = await userModel.updateOne({ _id: id }, { subscription: true })
        res.send(updatedUser)
      } else {
        res.send(`you are not authorized`)
      }
    } else {
      res.send(`you are not authorized`)
    }
  } catch (err) {
    res.send("you are not authorized")
  }
})

userRouter.post("/logout", async (req, res) => {
  const token = req.headers.authorization;
  // console.log(token);

  try {

    if (!token) {
      return res.status(401).send({ msg: "You need to login first" });
    }

    jwt.verify(token, "masai", async (err, decoded) => {
      if (err) {
        res.send("Token invalid, Pass the right token")
      } else {

        let blacklistedtokens = await blacklistmodel.find()

        if (blacklistedtokens[0]?.blacklist.includes(token)) {

          res.status(401).send({ "msg": "User already logged out, token in blacklist" });
        }
        else {
          const result = await blacklistmodel.updateOne(
            {},
            { $addToSet: { blacklist: token } },
            { upsert: true }
          );

          console.log(result);
          res.send({ "msg": "User logged out Successfully" })
        }
      }
    })



  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error" });
  }

});



module.exports = { userRouter }
