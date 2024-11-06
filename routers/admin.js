const express = require("express");
const adminControlller = require("../controllers/admin.controlller");
const router = express.Router();
router.post('/users/create', adminControlller.createNewAdmin);

router.get('/me', adminControlller.getMyProfile );
router.put('/me', adminControlller.updateMyProfile);

router.delete('/users/:id', adminControlller.deleteUser);
router.put('/users/:id', adminControlller.updateUsers);
router.get('/users/', adminControlller.getAllUsers);
router.get('/users/:id', adminControlller.getUserById);

router.get('/stats', adminControlller.getStats);

module.exports = router;