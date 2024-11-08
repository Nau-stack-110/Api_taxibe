const express = require("express");
const adminController = require("../controllers/admin.controller");
const { CheckAdmin, CheckToken } = require("../middlewares/authorize");
const router = express.Router();

router.get('/me', [CheckToken, CheckAdmin], adminController.getMyProfile );
router.put('/me', [CheckToken, CheckAdmin], adminController.updateMyProfile);

router.delete('/users/:id', [CheckToken, CheckAdmin], adminController.deleteUser);
router.put('/users/:id',[ CheckToken, CheckAdmin], adminController.changepassword);
router.get('/users/', [CheckToken, CheckAdmin], adminController.getAllUsers);
router.get('/users/:id', [CheckToken, CheckAdmin], adminController.getUserById);

router.get('/stats', [CheckToken, CheckAdmin], adminController.getStats);

module.exports = router;