const { Bookings, Trajet, User, Route, TaxiBe, Cooperative } = require('../models');

const createBooking = async (req, res) =>{
    const user_id = req.user.id;
    const { trajet_id, nb_mpandeha } = req.body;
    try {
        const trajet = await Trajet.findOne({
            where: {id: trajet_id},
            include: {
                model: TaxiBe,
                attributes: ['nb_total_place'],
            },
        });
        if (!trajet) {
            return res.status(404).send({error : "Trajet non trouvé! "});
        }
        const {nb_total_place} = trajet.taxibe_id;
        const place_dispo = trajet.place_dispo;
        if (nb_mpandeha > nb_total_place){
            return res.status(400).send({
                error : `"Nombre de place démandés (${nb_mpandeha} dépasse le total de places disponibles dans le taxibe (${nb_total_place})`,
            });
        }
        if (nb_mpandeha > place_dispo){
            return res.status(400).send({
                error : `"Nombre de place démandés (${nb_mpandeha} dépasse le total de places disponibles (${place_dispo})`,
            });
        }
        const booking = await Bookings.create({
            trajet_id,
            user_id:user_id,
            nb_mpandeha,
            date_booking: new Date(),
        });

        trajet.place_dispo -= nb_mpandeha;
        await trajet.save();
        res.status(201).send({
            message:"Reservation effectuée avec succès", booking
        });
    } catch (e) {
        res.status(500).send({
            message:"Internal Server Error!",
            error:e.message
        })
    }
}

const getAllBooking = async (req, res) =>{
    try {
        const booking = await Bookings.findAll(
            { 
                include:[
                    {
                        model:Trajet,
                        attributes:['date', 'route_id', 'taxibe_id'],
                        include : [
                            {
                                model:TaxiBe,
                                attributes: ['matricule', 'type', 'category'],
                                include:{
                                    model:Cooperative,
                                    attributes: ['name', 'contact'],
                                },
                            },
                            {
                                model:Route,
                                attributes: ['depart_city', 'arrival_city'],
                            }
                        ],
                    },
                    {
                        model:User,
                        attributes : ['name', 'email', 'tel', 'image'],
                    },
                ],
                attributes : ['id', 'nb_mpandeha', 'date_booking']
            }
        );
        res.status(200).send(booking);
    } catch (e) {
        res.status(500).send({
            e:'erreur lors de la récuperation des reservations', e
        });
    }
}

const cancelBooking = async (req, res) =>{
    try { 
        const booking = await Bookings.findOne({
            where : {
                // id:booking_id,
                user_id:req.user.id,
            },
            include : [
                {
                    model: Trajet,
                    attributes: ['id', 'place_dispo'],
                },
            ]
        });
        if (!booking) {
            return res.status(404).send({message:"Reservation non trouvé !"});
        }
        const trajet = await Trajet.findByPk(booking.trajet_id);
        trajet.place_dispo += booking.nb_mpandeha;
        await trajet.save();

        await booking.destroy();
        res.status(200).send({message: 'Reservation annulée avec succès!'});
    } catch (error) {
        res.status(500).send({
            message:'erreur lors de l\'annulation d\'une reservation', 
            error:error.message
        });
    }
}


const getBookingById = async (req, res) =>{

}

const getMyBooking = async (req, res) =>{
    try {
        const booking = await Bookings.findAll(
            { where: {user_id:req.user.id},
                include:[
                    {
                        model:Trajet,
                        attributes:['id', 'date', 'route_id', 'taxibe_id'],
                        include : [
                            {
                                model:TaxiBe,
                                attributes: ['matricule', 'type', 'category'],
                                include:{
                                    model:Cooperative,
                                    attributes: ['name', 'contact'],
                                },
                            },
                            {
                                model:Route,
                                attributes: ['depart_city', 'arrival_city'],
                            }
                        ],
                    },
                    {
                        model:User,
                        attributes : ['name', 'email', 'tel', 'image'],
                    },
                ],
                attributes : ['id', 'nb_mpandeha', 'date_booking', 'ticketCode', 'is_booked']
            }
        );
        res.status(200).send(booking);
    } catch (e) {
        res.status(500).send({
            message:'erreur lors de la récuperation de votre reservation', 
            error: e.message
        });
    }
}

module.exports = {
    getAllBooking:getAllBooking,
    getBookingById:getBookingById,
    cancelBooking:cancelBooking,
    createBooking:createBooking,
    getMyBooking:getMyBooking
}