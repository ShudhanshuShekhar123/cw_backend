const express = require("express")
const route = express.Router()
const Gymmodal = require("../models/Gymmodal")
const Adminmodel = require("../models/adminmodel")
const jwt = require("jsonwebtoken")
const blacklistmodel = require("../models/blacklistmodal")
const adminauthmiddleware = require("../middleware/adminauthmiddleware")
const {userModel} = require("../models/user.model")

route.post("/login", async (req, res) => {

    let { name, password } = req.body

    try {
        const user = await Adminmodel.findOne({ name, password })
        console.log(user)
        if (!user) {
            res.send("Admin not found")
        } else {
            const token = jwt.sign({ userId: user._id }, "admin")
            return res.status(201).json({ user, token })
        }
    } catch (err) {
        res.send("server error")
    }

})

//get all user

route.get("/getusers", async (req, res) => {
    try {

        const users = await userModel.find();
        res.status(200).json(users);

    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve users." });
    }
});



//get all exercise
route.get("/exercise", adminauthmiddleware, async (req, res) => {

    let allexercise = await Gymmodal.find()
    res.json(allexercise)
})


//add exercise
route.post("/addexercise", adminauthmiddleware, async (req, res) => {

    try {
        const addexercise = await Gymmodal.create(req.body);
        res.status(201).json(addexercise);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})


//update exercise
route.patch("/update/:id", adminauthmiddleware, async (req, res) => {

    const { id } = req.params
    console.log(id)

    try {
        const updatedgymexercise = await Gymmodal.updateOne({ _id: id }, req.body);
        if (updatedgymexercise.modifiedCount === 0) {
            return res.status(404).json({ msg: "No changes made" });
        }
        res.status(200).json({ msg: "Exercise Updated Succesfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }

})



//delete exercise
route.delete("/delete/:id", adminauthmiddleware, async (req, res) => {

    const { id } = req.params
    console.log(id)

    try {
        const deletedgymexercise = await Gymmodal.findByIdAndDelete({ _id: id });
        console.log(deletedgymexercise)
        if (deletedgymexercise) {
            res.status(200).json({ msg: "Exercise deleted Succesfully" });
        } else {
            res.status(404).send("Invalid id or deleted already")
        }

    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }

})


//logout 
route.post("/logout", async (req, res) => {
    const token = req.headers.authorization;

    try {
        if (!token) {
            return res.status(401).send({ msg: "You need to login as admin first" });
        }

        jwt.verify(token, "admin", async (err, decoded) => {
            if (err) {
                res.send("Token invalid found in admin, Pass the right token")
            } else {
                let blacklistedtokens = await blacklistmodel.find()
                if (blacklistedtokens[0]?.blacklist.includes(token)) {
                    res.status(401).send({ "msg": "User already logged out as admin, token in blacklist" });
                }
                else {
                    const result = await blacklistmodel.updateOne(
                        {},
                        { $addToSet: { blacklist: token } },
                        { upsert: true }
                    );
                    console.log(result);
                    res.send({ "msg": "Admin logged out Successfully" })
                }
            }
        })



    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }

});








module.exports = route