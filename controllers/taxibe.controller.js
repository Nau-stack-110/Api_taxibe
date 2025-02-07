const {TaxiBe, Cooperative, User} = require('../models');

const createTaxibe = async (req, res) =>{
    const cetaxibe = {
        type :req.body.type,
        imageTaxi:req.body.imageTaxi,
        matricule:req.body.matricule,
        category:req.body.category,
        nb_total_place:req.body.nb_total_place,
        cooperative_id:req.body.cooperative_id,
    };
    try {
        const taxibe = await TaxiBe.create(cetaxibe);
        res.status(201).json(taxibe);
    } catch (e) {
        res.status(400).json({
            message:'erreur lors de la création d\'un taxibe',
            error:e.message
        });
    }
}

const createTaxiBePls = async (req, res) =>{
    const taxibeData= req.body;
    try {
        const taxibe = await TaxiBe.bulkCreate(taxibeData);
        res.status(201).json(taxibe);
    } catch (e) {
        res.status(400).json({
            message:'erreur lors de la création des taxibes',
            error:e.message
        });
    }
}

const updateTaxibe = async (req, res) =>{
    const id = req.params.id;
    const updateTaxibe = {
        type :req.body.type,
        imageTaxi:req.body.imageTaxi,
        matricule:req.body.matricule,
        category:req.body.category,
        nb_total_place:req.body.nb_total_place,
        cooperative_id:req.body.cooperative_id,
    }
    try {
        const taxibe = await TaxiBe.update(updateTaxibe, {where :{id:id}});
        if (!taxibe) {
            res.status(404).json({
                message:"Taxibe not found !"
            }); 
        }
        return res.status(200).json({message:"taxibe mise à jour avec succès!", updateTaxibe});
    } catch (e) {
        res.status(500).json({
            e:'erreur lors de la mise à jour de ce taxibe'
        }); 
    }
}

const deleteTaxiBeById = async (req, res) =>{
    const id = req.params.id;
    try {
        const taxibe = await TaxiBe.destroy({where : {id:id}});
        if (!taxibe) {
            res.status(404).json({
                message:"Taxibe not found !"
            }); 
        } else {
            res.status(200).json({
                message:"taxibe supprimée avec succès!"
            });
        }
    } catch (e) {
        res.status(500).json({
            e:'erreur lors de l\'effacement de ce taxibe'
        });
    }
}

const getAllTaxibe = async (req, res) =>{
    try {
        const taxibe = await TaxiBe.findAll({ 
            include:{
                model:Cooperative,
                attributes:['name', 'contact', 'admin']
            }});
        res.status(200).json(taxibe);
    } catch (e) {
        res.status(500).json({
            message:'erreur lors de la récuperation des taxibe',
            error:e.message
        });
    }
}

const getTaxibeById = async (req, res) =>{
    const id = req.params.id;
    try {
        const taxibe = await TaxiBe.findByPk(id,{ 
            include:{
                model:Cooperative,
                attributes:['name', 'contact', 'admin'],
            
                include: {
                    model: User,
                    attributes: ["name", "email","tel"],
                },
            }
            });
        if(!taxibe){
            res.status(404).json({
                message:"Taxibe not found !"
            });
        }else{
            res.status(200).json(taxibe);
        }
    } catch (e) {
        res.status(500).json({
            e:'erreur lors de la récuperation de ce taxibe'
        });
    }
}

module.exports = {
    createTaxibe:createTaxibe,
    createTaxiBePls:createTaxiBePls,
    updateTaxibe:updateTaxibe,
    getAllTaxibe:getAllTaxibe,
    deleteTaxiBeById:deleteTaxiBeById,
    getTaxibeById:getTaxibeById
}
