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
    }
})

module.exports = mongoose.model("food", foodSchema);