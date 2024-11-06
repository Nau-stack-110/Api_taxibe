const { Bookings } = require('../models');

const createBooking = async (req, res) =>{

}

const deleteBooking = async (req, res) =>{

}

const updateBooking = async (req, res) =>{

}

const getBookingById = async (req, res) =>{

}

const getAllBooking = async (req, res) =>{
    try {
        const booking = await Bookings.findAll();
        res.status(200).send(booking);
    } catch (e) {
        res.status(500).send({
            e:'erreur lors de la récuperation des reservations', e
        });
    }
}

module.exports = {
    getAllBooking:getAllBooking,
    getBookingById:getBookingById,
    updateBooking:updateBooking,
    deleteBooking:deleteBooking,
    createBooking:createBooking
}