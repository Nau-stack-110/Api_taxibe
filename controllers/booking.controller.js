const { Bookings, Trajet } = require('../models');

const createBooking = async (req, res) =>{
    const user_id = req.user.id;
    const { trajet_id, nb_mpandeha } = req.body;
    console.log("Corps de la requete:", req.body);
    try {
        if (!trajet_id || !nb_mpandeha) {
            console.log("validation echoué , manque des données");
            return res.status(400).send({message:"Veuiller fournir un trajet valide et des places"});
        }
        const trajet = await Trajet.findOne({where:{id:trajet_id}});
        console.log("trajet trouvé : ", trajet );
        if (!trajet) {
            return res.status(404).send({message:"Trajet not found!"})
        }
        const availablePlace = JSON.parse(trajet.place_dispo || '[]');
        console.log('availablePlace : ', availablePlace);
        const isPlaceAvailable = nb_mpandeha.every((place) => availablePlace.includes(place));
        if (!isPlaceAvailable) {
            return res.status(400).send({
                message:"Une ou plusieurs places selected n'est pas disponible!"
            });
        }
        const updatePlace = availablePlace.filter((place) => !nb_mpandeha.includes(place));
        await sequelize.transaction(async (transaction) =>{
            await Bookings.create({
                trajet_id,
                user_id,
                nb_mpandeha,
                date_booking: new Date(),
            },
            { transaction }
        );
        await trajet.update(
            { place_dispo: JSON.stringify(updatePlace)},
            { transaction }
            );
        });
        res.status(201).send({
            message:"Reservation effectuée avec succès",
        });
    } catch (e) {
        res.status(500).send({
            message:"Internal Server Error!",
            error:e.message
        })
    }
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