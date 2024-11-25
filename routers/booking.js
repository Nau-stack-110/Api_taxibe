const express = require("express");
const bookingController = require("../controllers/booking.controller");
const router = express.Router();
const { CheckAdmin, CheckToken, } = require("../middlewares/authorize");

router.get('/:id',CheckToken, CheckAdmin, bookingController.getBookingById);
router.get('/',[ CheckToken, CheckAdmin], bookingController.getAllBooking);

module.exports = router;