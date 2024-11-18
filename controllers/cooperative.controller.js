const {Cooperative, User} = require("../models");

const createCoop  = async (req, res) =>{
    const { name, adresse, bio, contact, link_web, admin } = req.body;
    try {
        const coop = await Cooperative.create({name, adresse, bio, contact, link_web, admin});
        res.status(201).json(coop);
    } catch (e) {
        res.status(400).json({
            message:'erreur lors de la création d\'un cooperative',
            error:e.message
        });
    }
}

const updateCoop  = async (req, res) =>{
    const id = req.params.id;
    const { name, adresse, bio, contact, link_web } = req.body;
    try {
        const coop = await Cooperative.update({ name, adresse, bio, contact, link_web }, {where :{id:id}});
        if (!coop) {
            res.status(404).json({
                message:"Cooperative not found !"
            }); 
        }
        return res.status(200).json({message:"Cooperative mise à jour avec succès!"});
    } catch (e) {
        res.status(500).json({
            message:'erreur lors de la mise à jour de ce cooperative',
            error:e.message
        }); 
    }
}

const deleteCoop  = async (req, res) =>{
    const id = req.params.id;
    try {
        const coop = await Cooperative.destroy({where : {id:id}});
        if (!coop) {
            res.status(404).json({
                message:"Cooperative not found !"
            }); 
        } else {
            res.status(200).json({
                message:"Cooperative supprimée avec succès!"
            });
        }
    } catch (e) {
        res.status(500).json({
            message:'erreur lors de l\'effacement de ce cooperative',
            error:e.message
        });
    }
}

const getcoopById  = async (req, res) =>{
    const id = req.params.id;
    try {
        const coop = await Cooperative.findByPk(id, { 
            include:{
                model:User,
                attributes:['name', 'email', 'tel'],
        },
        attributes: ['name', 'contact', 'adresse', 'bio', 'link_web', 'createdAt'],
    });
        if(!coop){
            res.status(404).json({
                message:"Cooperative not found !"
            });
        }else{
            res.status(200).json(coop);
        }
    } catch (e) {
        res.status(500).json({
            message:'erreur lors de la récuperation de ce cooperative',
            error:e.message
        });
    }
}

const getAllCooperative  = async (req, res) =>{
    try {
        const coop = await Cooperative.findAll({
            include:{
                model:User,
                attributes:['name', 'email', 'tel'],
            },
            attributes: ['name', 'contact', 'adresse', 'bio', 'link_web', 'createdAt'],
        });
        res.status(200).send(coop);
    } catch (e) {
        res.status(500).send({
            message:'erreur lors de la récuperation des cooperatives', 
            error:e.message
        });
    }
}

module.exports = {
    getAllCooperative,
    getcoopById,
    deleteCoop,
    updateCoop,
    createCoop
}