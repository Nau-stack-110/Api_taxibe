const express = require("express");
const taxibeController = require("../controllers/taxibe.controller");
const { CheckToken, CheckAdmin } = require("../middlewares/authorize");
const router = express.Router();
router.post('/', [CheckToken, CheckAdmin], taxibeController.createTaxibe);
router.delete('/:id', [CheckToken, CheckAdmin], taxibeController.deleteTaxiBeById);
router.put('/:id', [CheckToken, CheckAdmin], taxibeController.updateTaxibe);

router.get('/:id', taxibeController.getTaxibeById);
router.get('/', taxibeController.getAllTaxibe);

module.exports = router;