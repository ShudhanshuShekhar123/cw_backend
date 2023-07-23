const mongoose = require('mongoose');


const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zero if month/day is a single digit
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
};


const getDayOfWeek = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayIndex = today.getDay();
    return daysOfWeek[dayIndex];
};

const Diaryschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
    repetition: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    }

});



const Diarymodel = mongoose.model('diary', Diaryschema);

module.exports = Diarymodel;
