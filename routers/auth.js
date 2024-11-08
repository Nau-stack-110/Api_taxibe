const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
router.post("/", authController.createAdmin);

router.post("/forgot/password", authController.forgotpassword);
router.post("/reset/password", authController.resetpassword);

router.post("/signup", authController.register);
router.post("/login", authController.login);
// router.post("/logout", authController.logout);


module.exports = router;