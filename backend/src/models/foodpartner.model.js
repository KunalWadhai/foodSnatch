const mongoose = require("mongoose");

const foodPartnerSchema = mongoose.Schema({
    bussinessName : {
        type: String,
        required: true
    },
    contactName : {
        type :String, 
        required:true
    },
    phone : {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
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