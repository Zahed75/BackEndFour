const express = require('express');
const ProfileController = require("../controllers/ProfileController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const {ProfileUpdate} = require("../controllers/ProfileController");
const router = express.Router();


//API ENDPOINT

router.post("/registrations", ProfileController.registartion)
router.post("/login", ProfileController.Login)
// JWT Needed

router.post("/updateProfile", AuthVerifyMiddleware, ProfileController.ProfileUpdate)

module.exports = router;