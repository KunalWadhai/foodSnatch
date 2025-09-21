const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({
    storage : multer.memoryStorage(),
});

// prefix api endpoint : /api/food/...then the forward api point
// for adding food food partner must be logged in so it would be the protected route
router.post("/", authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);

// when user scrolls the food reels i.e sending get request /api/food -- get ---protected
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

// some features over the food reels to like and save the stuff. 
// post: /api/food/like
router.post("/like", authMiddleware.authUserMiddleware, foodController.likeFood);

// post : /api/food/save-food
router.post("/save", authMiddleware.authUserMiddleware, foodController.saveFoodReel);

module.exports = router;