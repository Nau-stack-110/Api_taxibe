const { Bookings, Trajet, User, Route, TaxiBe, Cooperative } = require('../models');

const createBooking = async (req, res) => {
    const user_id = req.user.id;
    const { trajet_id, seat_researved } = req.body;
   
    // Calculer nb_mpandeha automatiquement à partir de la longueur de seat_researved
    const nb_mpandeha = Array.isArray(seat_researved) ? seat_researved.length : 0;

    try {
        if (!Array.isArray(seat_researved)) {
            return res.status(400).send({
                error: "seat_researved must be an array."
            });
        }
        
        const trajet = await Trajet.findOne({
            where: { id: trajet_id },
            include: {
                model: TaxiBe,
                attributes: ['nb_total_place'],
            },
        });
        if (!trajet) {
            return res.status(404).send({ error: "Trajet non trouvé!" });
        }
        
        if (nb_mpandeha > trajet.place_dispo) {
            return res.status(400).send({
                error: `Nombre de places demandées (${nb_mpandeha}) dépasse le nombre de places disponibles (${trajet.place_dispo}).`
            });
        }
        
        const validSeats = trajet.seats;
        const reservedSeats = trajet.place_reserve || [];
        
        for (const seat of seat_researved) {
            if (!validSeats.includes(seat)) {
                return res.status(400).send({ error: `La place ${seat} n'est pas valide.` });
            }
            if (reservedSeats.includes(seat)) {
                return res.status(400).send({ error: `La place ${seat} est déjà réservée.` });
            }
        }
        
        const booking = await Bookings.create({
            trajet_id,
            user_id,
            seat_researved,
            date_booking: new Date(),
        });
    
        trajet.place_reserve = reservedSeats.concat(seat_researved);
        trajet.place_dispo = trajet.place_dispo - nb_mpandeha;
        await trajet.save();
        
        res.status(201).send({
            message: "Réservation effectuée avec succès",
            booking
        });
    } catch (e) {
        res.status(500).send({
            message: "Internal Server Error!",
            error: e.message
        });
    }
};

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

const cancelBooking = async (req, res) => {
    try { 
        const booking = await Bookings.findOne({
            where: {
                user_id: req.user.id,
            },
            include: [
                {
                    model: Trajet,
                    attributes: ['id', 'place_dispo', 'place_reserve'],
                },
            ]
        });
        if (!booking) {
            return res.status(404).send({ message: "Réservation non trouvée!" });
        }
        const trajet = await Trajet.findByPk(booking.trajet_id);
        if (!trajet) {
            return res.status(404).send({ message: "Trajet non trouvé pour cette réservation!" });
        }
    
        // Remove the booking's reserved seats from the trajet's current reserved seats
        trajet.place_reserve = trajet.place_reserve.filter(
            seat => !booking.seat_researved.includes(seat)
        );
        trajet.place_dispo += booking.nb_mpandeha;
        await trajet.save();
    
        await booking.destroy();
        res.status(200).send({ message: 'Réservation annulée avec succès!' });
    } catch (error) {
        res.status(500).send({
            message: 'Erreur lors de l\'annulation de la réservation',
            error: error.message
        });
    }
};


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