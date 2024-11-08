const express = require("express");
const routeController = require("../controllers/route.controller");
const { CheckToken, CheckAdmin } = require("../middlewares/authorize");
const router = express.Router();

router.post('/', [ CheckToken, CheckAdmin], routeController.createRoute);
router.put('/:id', [CheckToken, CheckAdmin], routeController.updateRoute);
router.delete('/:id', [ CheckToken, CheckAdmin], routeController.deleteRoute);

router.get('/:id', routeController.getRouteById);
router.get('/', routeController.getAllRoute);

module.exports = router;