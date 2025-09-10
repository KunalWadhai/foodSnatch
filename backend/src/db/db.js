const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => {
        console.log("MongoDB Connection Failed Due to ", err.message);
    })
}

module.exports = connectDB;