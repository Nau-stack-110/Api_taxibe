const express = require("express");
const taxibeController = require("../controllers/taxibe.controller");
const router = express.Router();
router.post('/', taxibeController.createTaxibe);
router.get('/:id', taxibeController.getTaxibeById);
router.put('/:id', taxibeController.updateTaxibe);
router.delete('/:id', taxibeController.deleteTaxiBeById);
router.get('/', taxibeController.getAllTaxibe);

module.exports = router;