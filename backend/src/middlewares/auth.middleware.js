const foodPartnerModel = require("../models/foodpartner.model");
const foodPartner = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


const authFoodPartnerMiddleware = async (req, res, next) => {
    let token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "You must login first"
        });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        let foodPartner = await foodPartnerModel.findById(decoded.id || decoded._id);

        if(!foodPartner){
            return res.status(401).json({
                message: "Invalid Token - Food Partner not found"
            });
        }

        req.foodPartner = foodPartner;

        next();
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
}

const authUserMiddleware = async(req, res, next) => {
    let token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message : "You must login first"
        });
    }
    try{
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await userModel.findById(decoded.id || decoded._id);

        if(!user){
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;

        next();
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
}
module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}