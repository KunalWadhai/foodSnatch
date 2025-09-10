
// Server Create 
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// APIs
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

module.exports = app;