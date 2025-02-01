const {Route} = require("../models");

const createRoute  = async (req, res) =>{
    const { depart_city, arrival_city} = req.body;
    try {
        const route = await Route.create({depart_city, arrival_city});
        res.status(201).json(route);
    } catch (e) {
        res.status(400).json({
            message:'erreur lors de la création d\'un route',
            error:e.message
        });
    }
}

const createRoutePls = async (req, res) =>{
    const routeData= req.body;
    try {
        const route = await Route.bulkCreate(routeData);
        res.status(201).json(route);
    } catch (e) {
        res.status(400).json({
            message:'erreur lors de la création des route',
            error:e.message
        });
    }
}


const updateRoute  = async (req, res) =>{
    const id = req.params.id;
    const {depart_city, arrival_city } = req.body;
    try {
        const route = await Route.update({depart_city, arrival_city}, {where :{id:id}});
        if (!route) {
            res.status(404).json({
                message:"Route not found !"
            }); 
        }
        return res.status(200).json({message:"Route mise à jour avec succès!"  });
    } catch (e) {
        res.status(500).json({
            e:'erreur lors de la mise à jour de ce route'
        }); 
    }
}

const deleteRoute  = async (req, res) =>{
    const id = req.params.id;
    try {
        const route = await Route.destroy({where : {id:id}});
        if (!route) {
            res.status(404).json({
                message:"Route not found !"
            }); 
        } else {
            res.status(200).json({
                message:"route supprimée avec succès!"
            });
        }
    } catch (e) {
        res.status(500).json({
            message:'erreur lors de l\'effacement de ce route',
            error:e.message
        });
    }
}


const deleteAllRoute  = async (req, res) =>{
    try {
        const route = await Route.destroy({where : {}});
        if (!route) {
            res.status(404).json({
                message:"Route not found !"
            }); 
        } else {
            res.status(200).json({
                message:"routes supprimées avec succès!"
            });
        }
    } catch (e) {
        res.status(500).json({
            message:'erreur lors de l\'effacement de tous les routes',
            error:e.message
        });
    }
}


const getRouteById  = async (req, res) =>{
    const id = req.params.id;
    try {
        const route = await Route.findByPk(id);
        if(!route){
            res.status(404).json({
                message:"Route not found !"
            });
        }else{
            res.status(200).json(route);
        }
    } catch (e) {
        res.status(500).json({
            message:'erreur lors de la récuperation de ce route',
            error:e.message
        });
    }
}

const getAllRoute  = async (req, res) =>{
    try {
        const route = await Route.findAll();
        res.status(200).send(route);
    } catch (e) {
        res.status(500).send({
            message:'erreur lors de la récuperation des routes', 
            error:e.message
        });
    }
}

module.exports = {
    createRoute:createRoute,
    updateRoute:updateRoute,
    deleteRoute:deleteRoute,
    getAllRoute:getAllRoute,
    getRouteById:getRouteById,
    createRoutePls:createRoutePls,
    deleteAllRoute:deleteAllRoute,
}