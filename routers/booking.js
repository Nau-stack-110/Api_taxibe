const express = require("express");
const bookingController = require("../controllers/booking.controller");
const router = express.Router();
const { CheckAdmin, CheckToken } = require("../middlewares/authorize");


router.post('/', CheckToken, bookingController.createBooking);
router.get('/:id',CheckToken, CheckAdmin, bookingController.getBookingById);
router.put('/:id', CheckToken, bookingController.updateBooking);
router.delete('/:id', CheckToken, bookingController.deleteBooking);
router.get('/',[ CheckToken, CheckAdmin], bookingController.getAllBooking);

module.exports = router;