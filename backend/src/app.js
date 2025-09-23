
// Server Create 
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodPartnerRoutes = require("./routes/food-partner.routes");
const cors = require("cors")


// cross origin resource sharing we should to use for actually
// connection for the request from frontend to backend as of 
// browser runs on same-origin policy (SOP)
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// APIs
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);

module.exports = app;