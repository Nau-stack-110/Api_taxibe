const express = require('express');
const router = express.Router();
const trajetController = require('../controllers/trajet.controller');
const { CheckToken, CheckAdmin } = require('../middlewares/authorize');

router.post('/', [CheckToken, CheckAdmin],  trajetController.createTrajet );
router.post('/betsaka', [CheckToken, CheckAdmin],  trajetController.createTrajetPls );

router.put('/:id', [CheckToken, CheckAdmin],  trajetController.updateTrajet );
router.delete('/:id', [CheckToken, CheckAdmin], trajetController.deleteTrajet );

router.get('/', trajetController.getAllTrajet );
router.get('/available-taxibe', trajetController.getAvailableTaxi );
router.get('/:id', trajetController.getTrajetById );

module.exports = router;
