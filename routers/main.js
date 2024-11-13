const express = require("express");
const mainRouter = express.Router();

const userRouter = require("./user");
const taxibeRouter = require("./taxibe");
const rideRouter = require("./route");
const bookingRouter = require("./booking");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const trajetRouter = require("./trajet");
const cooperativeRouter = require('./cooperative');
// const paymentRouter = require("./payment");


mainRouter.use("/auth", authRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/booking", bookingRouter);
mainRouter.use("/taxibe", taxibeRouter);
mainRouter.use("/route", rideRouter);
mainRouter.use("/trajet", trajetRouter);
mainRouter.use("/cooperative", cooperativeRouter)
// mainRouter.use("/payment", paymentRouter);


module.exports = mainRouter;
