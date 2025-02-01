const express = require("express");
const routeController = require("../controllers/route.controller");
const { CheckToken, CheckAdmin } = require("../middlewares/authorize");
const router = express.Router();

router.post('/', [ CheckToken, CheckAdmin], routeController.createRoute);
router.post('/betsaka', [ CheckToken, CheckAdmin], routeController.createRoutePls);
router.put('/:id', [CheckToken, CheckAdmin], routeController.updateRoute);
router.delete('/:id', [ CheckToken, CheckAdmin], routeController.deleteRoute);
router.delete('/delete/all', [ CheckToken, CheckAdmin], routeController.deleteAllRoute);


router.get('/:id', routeController.getRouteById);
router.get('/', routeController.getAllRoute);

module.exports = router;