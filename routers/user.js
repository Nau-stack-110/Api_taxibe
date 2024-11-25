const express = require("express");
const userController = require("../controllers/user.controller");
const bookingController = require("../controllers/booking.controller");
const { CheckToken, CheckUser } = require("../middlewares/authorize");
const { generatePDFTicket, verifyTicketCode } = require("../controllers/ticket.Controller");
const router = express.Router();
// profile
router.get('/me',[ CheckToken, CheckUser], userController.getMyProfile );
router.put('/me', [CheckToken, CheckUser], userController.updateMyProfile);

router.delete('/me/delete', [CheckToken, CheckUser], userController.deleteMyProfile);
router.put('/me/password/change', [CheckToken, CheckUser], userController.changepassword);

// ticket
router.post('/generate-ticket/:id', [CheckToken, CheckUser], generatePDFTicket);
router.post('/verify-ticket/', [CheckToken, CheckUser], verifyTicketCode);

// bookings
router.post('/booking/create', [CheckToken, CheckUser], bookingController.createBooking);
router.delete('/booking/me', [CheckToken, CheckUser], bookingController.cancelBooking);
router.get('/booking/me/', [CheckToken, CheckUser], bookingController.getMyBooking);
router.put('/booking/me',[ CheckToken, CheckUser], bookingController.updateMyBooking);


module.exports = router;
