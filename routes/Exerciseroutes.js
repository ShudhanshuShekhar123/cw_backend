const express = require("express")
const route = express.Router()
const { authMiddleware } = require("../middleware/auth.middleware")
const Gymmodal = require("../models/Gymmodal")
const Diarymodel = require("../models/Diarymodel")


route.get("/exercise", authMiddleware, async (req, res) => {



    const { category, type } = req.query

    try {
        if (category === "gym") {
            if (!type) {
                res.status(400).send("Please provide 'type' in the query.");
            } else {
                const gymexercises = await Gymmodal.find({ type })
                if (gymexercises.length === 0) {
                    res.status(404).send("No exercises found with the specified type.");
                } else {
                    res.json(gymexercises);
                }
            }
        } else {
            res.status(400).send("Invalid category or category not found");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

})


// route.get('/search', async (req, res) => {
//     try {
//         if (!req.query.q) {
//             return res.status(400).send('Missing query parameter: q');
//         }
//         let regexpattern = new RegExp(req.query.q, 'i');
//         let gymexercises = await Gymmodal.find({ name: regexpattern });

//         if (gymexercises.length === 0) {
//             return res.send('No exercises found');
//         }
//         res.json(gymexercises);
//     } catch (error) {

//         res.status(500).send('Internal Server Error');
//     }
// });



route.get('/search', async (req, res) => {


    try {
        if (!req.query.q) {
            return res.status(400).send('Missing query parameter: q');
        }

        // let regexpattern = new RegExp(req.query.q, 'i');
        // console.log(regexpattern)
        let gymexercises = await Gymmodal.find({});
        console.log(gymexercises)


        if (gymexercises) {
            let filter = gymexercises.filter((el) => {

                if (el.description.toLowerCase().includes(req.query.q.toLowerCase())) {
                    // console.log(req.query.q.toLowerCase())
                    return true
                } else {
                    return false
                }
            })
            return res.json(filter);
        }

        if (gymexercises.length === 0) {
            return res.send('No exercises found');
        }

    } catch (error) {

        res.status(500).send('Internal Server Error');
    }
});


//DIARY


const getDayOfWeek = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayIndex = today.getDay();
    // console.log(dayIndex,"here")
    return daysOfWeek[dayIndex];
};


route.post("/diary", authMiddleware, async (req, res) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
    console.log(formattedDate)
    // let date = formattedDate
    const dateParts = formattedDate.split('/');
    const formattedDateWithDashes = dateParts.reverse().join('-');
    // const dateObject = new Date(formattedDate);
    const currentDay = getDayOfWeek();

    try {
        const workoutadded = await Diarymodel.create({ ...req.body, creator: req.userId, date: formattedDateWithDashes, day: currentDay })
        res.send({ workoutadded, msg: " workout added succesfully" })
    } catch (error) {
        res.status(500).send("Internal server error")
    }

   

})



route.get("/diarydetails", authMiddleware, async (req, res) => {
    // const userIdAsObjectId = mongoose.Types.ObjectId(req.userId);

    try {
        const diarydetails = await Diarymodel.find({ creator: req.userId })
        if (diarydetails.length == 0) {
            return res.status(200).send("No workout added ")
        }
        res.send(diarydetails)
    } catch (error) {
        res.status(500).send("Internal server error")
    }

    // let y = await Diarymodel.findById(x._id).populate('creator');

})



module.exports = route