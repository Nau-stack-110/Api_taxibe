const express = require("express");
const adminController = require("../controllers/admin.controller");
const router = express.Router();

router.get('/me', adminController.getMyProfile );
router.put('/me', adminController.updateMyProfile);

router.delete('/users/:id', adminController.deleteUser);
router.put('/users/:id', adminController.changepassword);
router.get('/users/', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);

router.get('/stats', adminController.getStats);

module.exports = router;