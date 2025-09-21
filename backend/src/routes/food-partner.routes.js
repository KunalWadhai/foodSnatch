const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const FoodPartnerController = require("../controllers/food-partner.controller");

// to fetch the food partner details => localhost:3000/api/food/food-partner/:id
router.get("/:id", authMiddleware.authUserMiddleware, FoodPartnerController.getFoodPartnerById);


module.exports = router;
