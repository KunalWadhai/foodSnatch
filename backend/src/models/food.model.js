const mongoose = require("mongoose");
const foodpartnerModel = require("./foodpartner.model");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    foodpartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodpartner'
    }, 
    likeCount: {
        type: Number,
        default: 0
    },
    savesCount: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("food", foodSchema);