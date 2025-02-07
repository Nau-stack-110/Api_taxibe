const {Trajet, TaxiBe, Route,} = require("../models");

const createTrajet  = async (req, res) =>{
    const { taxibe_id, route_id, date } = req.body;
    try {
        const taxi = await TaxiBe.findByPk(taxibe_id);
        if (!taxi) {
            return res.status(404).send({ message: 'Taxibe not found.' });
        }
        const total_places = taxi.nb_total_place;
        const seats = Array.from({ length: total_places }, (_, i) => i + 1);
        
        const place_reserve = [];
        const place_dispo = total_places;
        
        const trajet = await Trajet.create({
            taxibe_id,
            route_id,
            date, 
            place_dispo,
            seats,
            place_reserve
        });
        res.status(201).send(trajet);
    } catch (e) {
        res.status(400).send({
            message:'erreur lors de la création d\'un trajet',
            error:e.message
        });
    }
}

const updateTrajet  = async (req, res) =>{
    const id = req.params.id;
    const { taxibe_id, route_id, date, place_dispo} = req.body;
    try {
        const trajet = await Trajet.update({taxibe_id, route_id, date, place_dispo}, {where :{id:id}});
        if (!trajet) {
            res.status(404).json({
                message:"Trajet not found !"
            }); 
        }
        return res.status(200).json({message:"Trajet mise à jour avec succès!"  });
    } catch (e) {
        res.status(500).json({
            e:'erreur lors de la mise à jour de ce trajet'
        }); 
    }
}

const deleteTrajet  = async (req, res) =>{
    const id = req.params.id;
    try {
        const trajet = await Trajet.destroy({where : {id:id}});
        if (!trajet) {
            res.status(404).json({
                message:"Trajet not found !"
            }); 
        } else {
            res.status(200).json({
                message:"trajet supprimée avec succès!"
            });
        }
    } catch (e) {
        res.status(500).json({
            message:'erreur lors de l\'effacement de ce trajet',
            error:e.message
        });
    }
}

const getTrajetById  = async (req, res) =>{
    const id = req.params.id;
    try {
        const trajet = await Trajet.findByPk(id,
            { include:[{
                model:Route,
                attributes:['depart_city', 'arrival_city'],
            },
            {
                model:TaxiBe,
                attributes : ['type', 'matricule', 'category', 'nb_total_place', 'cooperative_id'],
            },
        ],
        attributes: ['date', 'place_dispo', 'seats', 'place_reserve'],}
        );
        if(!trajet){
            res.status(404).json({
                message:"Trajet not found !"
            });
        }else{
            res.status(200).json(trajet);
        }
    } catch (e) {
        res.status(500).json({
            message:'erreur lors de la récuperation de ce trajet',
            error:e.message
        });
    }
}

const getAllTrajet  = async (req, res) =>{
    try {
        const trajet = await Trajet.findAll(
            { include:[{
                model:Route,
                attributes:['depart_city', 'arrival_city'],
            },
            {
                model:TaxiBe,
                attributes : ['type', 'matricule', 'category', 'nb_total_place', 'cooperative_id'],
            },
        ],
        attributes: ['date', 'place_dispo', 'seats', 'place_reserve'],}
        );
        res.status(200).send(trajet);
    } catch (e) {
        res.status(500).send({
            message:'erreur lors de la récuperation des trajets!', 
            error:e.message
        });
    }
}

const getAvailableTaxi = async (req, res) => {
    const { from, to, date } = req.query;
    try {
        if (!from || !to || !date) {
            return res.status(400).send({ 
                error: "Veuillez fournir les params 'from', 'to' et 'date'." 
            });
        }
        const trajets = await Trajet.findAll({
            where: { date },
            include: [
                {
                    model: Route,
                    attributes: ['depart_city', 'arrival_city'],
                    where: { 
                        depart_city: from, 
                        arrival_city: to 
                    }
                },
                {
                    model: TaxiBe,
                    attributes: ['type', 'matricule', 'category', 'nb_total_place', 'cooperative_id']
                }
            ]
        });

        if (trajets.length === 0) {
            return res.status(404).send({ 
                message: "Aucun TaxiBe disponible pour cette date et cet itinéraire." 
            });
        }
        const availableTaxis = trajets.map(trajet => ({
            date: trajet.date,
            route: trajet.Route,
            taxibe: trajet.TaxiBe
        }));
        res.status(200).send(availableTaxis);
    } catch (e) {
        res.status(500).send({
            message: 'Erreur lors de la recherche des TaxiBes disponibles!',
            error: e.message
        });
    }
};

module.exports = {
    getAllTrajet,
    getTrajetById,
    createTrajet,
    deleteTrajet,
    updateTrajet,
    getAvailableTaxi,
}