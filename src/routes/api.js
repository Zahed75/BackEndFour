const express = require('express');
const ProfileController = require("../controllers/ProfileController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const KitchenController = require("../controllers/KitchenController");
const router = express.Router();


//API ENDPOINT

router.post("/registrations", ProfileController.registartion)
router.post("/login", ProfileController.Login)
// JWT Needed
router.post("/updateProfile", AuthVerifyMiddleware, ProfileController.ProfileUpdate)

//JWT NOT NEEDED
router.get("/listUser", ProfileController.getUserData)

//Kitchen API SECTION-JWT NEEDED
router.post("/brandCreate", AuthVerifyMiddleware, KitchenController.createBrand)

module.exports = router;