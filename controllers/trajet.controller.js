const { where } = require("sequelize");
const {Trajet, TaxiBe, Route,} = require("../models");

const createTrajet  = async (req, res) =>{
    const { taxibe_id, route_id, date, place_dispo} = req.body;
    try {
        const trajet = await Trajet.create({
            taxibe_id,
            route_id,
            date, 
            place_dispo}
        );
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
        attributes: ['date', 'place_dispo'],}
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
        attributes: ['date', 'place_dispo'],}
        );
        res.status(200).send(trajet);
    } catch (e) {
        res.status(500).send({
            message:'erreur lors de la récuperation des trajets!', 
            error:e.message
        });
    }
}

const getAvailableTaxi = async (req, res) =>{
    const {date, route_id} = req.query;
    try {
        if (!date || !route_id) {
            return res.status(400).send({error:"Veuillez fournir une date et un ID de route. "});
        }
        const trajet = await Trajet.findAll(
            { 
            where: {
                date, route_id,
            },
            include:[
                {
                    model:Route,
                    attributes:['depart_city', 'arrival_city'],
                },
                {
                    model:TaxiBe,
                    attributes : ['type', 'matricule', 'category', 'nb_total_place', 'cooperative_id'],
                },
            ],
            }
        );
        if (trajet.length === 0) {
            return res.status(404).send({message:"Aucun TaxiBe disponible pour cette date et cette route."});
        }
        const taxibes = trajet.map((trajet) => ({
            date:trajet.date,
            route:trajet.route_id,
            taxibe:trajet.taxibe_id
        }));
        res.status(200).send(taxibes);
    } catch (e) {
        res.status(500).send({
            message:'erreur lors de la recherche des taxiBes disponibles!', 
            error:e.message
        });
    }
}

module.exports = {
    getAllTrajet,
    getTrajetById,
    createTrajet,
    deleteTrajet,
    updateTrajet,
    getAvailableTaxi,
}