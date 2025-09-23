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

// when user scrolls the food reels i.e sending get request /api/food -- get ---public (temporarily for testing)
router.get("/", foodController.getFoodItems);

// some features over the food reels to like and save the stuff.
// post: /api/food/like
router.post("/like", authMiddleware.authUserMiddleware, foodController.likeFood);

// post : /api/food/save-food
router.post("/save", authMiddleware.authUserMiddleware, foodController.saveFoodReel);

// get : /api/food/save - get saved foods for user
router.get("/save", authMiddleware.authUserMiddleware, foodController.getSavedFoods);

module.exports = router;
