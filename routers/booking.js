const express = require("express");
const bookingController = require("../controllers/booking.controller");
const router = express.Router();

router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);
router.get('/', bookingController.getAllBooking);

module.exports = router;