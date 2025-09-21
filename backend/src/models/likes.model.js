const mongoose = require("mongoose");


const likesSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    food : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food", 
        required: true
    }
},{
    timestamps : true
  }
);

module.exports = mongoose.model("like", likesSchema);