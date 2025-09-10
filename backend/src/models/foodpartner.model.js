const mongoose = require("mongoose");

const foodPartnerSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('foodpartner', foodPartnerSchema);