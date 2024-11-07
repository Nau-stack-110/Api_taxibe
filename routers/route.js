const express = require("express");
const routeController = require("../controllers/route.controller");
const router = express.Router();
router.post('/', routeController.createRoute);
router.get('/:id', routeController.getRouteById);
router.put('/:id', routeController.updateRoute);
router.delete('/:id', routeController.deleteRoute);
router.get('/', routeController.getAllRoute);

module.exports = router;