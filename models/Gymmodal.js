const mongoose = require('mongoose');


const GymSchema = new mongoose.Schema({
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

});



const Gymmodel = mongoose.model('gym', GymSchema);

module.exports = Gymmodel;
