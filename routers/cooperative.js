const express = require('express');
const router = express.Router();
const  cooperativeController = require('../controllers/cooperative.controller');
const { CheckToken, CheckAdmin } = require('../middlewares/authorize');

router.get('/', [CheckToken], cooperativeController.getAllCooperative );
router.get('/:id',[CheckToken], cooperativeController.getcoopById );

router.post('/', [CheckToken, CheckAdmin], cooperativeController.createCoop );
router.put('/:id', [CheckToken, CheckAdmin], cooperativeController.updateCoop );
router.delete('/:id', [CheckToken, CheckAdmin], cooperativeController.deleteCoop );

module.exports = router;