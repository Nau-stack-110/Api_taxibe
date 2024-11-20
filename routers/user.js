const express = require("express");
const userController = require("../controllers/user.controller");
const { CheckToken, CheckUser } = require("../middlewares/authorize");
const router = express.Router();

router.get('/me',[ CheckToken, CheckUser], userController.getMyProfile );
router.put('/me', [CheckToken, CheckUser], userController.updateMyProfile);

router.delete('/me/delete', [CheckToken, CheckUser], userController.deleteMyProfile);
router.put('/me/password/change', [CheckToken, CheckUser], userController.changepassword);


module.exports = router;
