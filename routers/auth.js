const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
router.post("/", authController.createAdmin);

// router.post("/forgot/passwod", authController.forgotpassword);
// router.post("/rest/password", authController.resetpassword);

router.post("/register", authController.register);
// router.post("/login", authController.login);
// router.post("/logout", authController.logout);


module.exports = router;