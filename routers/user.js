const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.get('/me', userController.getMyProfile );
router.put('/me', userController.updateMyProfile);

router.delete('/me/delete', userController.deleteMyProfile);
router.put('/me/change', userController.changepassword);

module.exports = router;