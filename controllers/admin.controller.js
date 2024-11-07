const {User, Bookings, Payment, Route, TaxiBe} = require('../models');

const getStats = async (req, res) =>{
    try {
        const userCount = await User.count();
        const bookingCount = await Bookings.count();
        const taxibeCount = await TaxiBe.count();
        const routeCount = await Route.count();
        const paymentCount = await Payment.count();
        res.status(200).send({
            message :"voici les statistiques : ",
            users : userCount,
            routes : routeCount,
            taxibe :taxibeCount,
            Payment :paymentCount,
            booking : bookingCount
        });
    } catch (e) {
        res.status(500).json({
            e:'erreur lors de la récuperation des statistiques'
        });
    }
}

const getMyProfile = async (req, res) =>{

}

const updateMyProfile = async (req, res) =>{

}

const deleteUser = async (req, res) =>{
    try {
        const deleteduser = await User.destroy({where :{id:req.params.id}});
        if (!deleteduser) {
            return res.status(404).send({message: "User not found"});
        }
        res.status(200).send({ message :"Utilisateurs supprimés avec succès!"});
    } catch (e) {
        res.status(500).json({
            e:'erreur lors de la suppression d\'utilisateur'
        });
    }
}

const getAllUsers = async (req, res) =>{
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({
            e:'erreur lors de la récuperation des utilisateurs'
        });
    }
}

const getUserById = async (req, res) =>{
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send({message:"User not found"});
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(500).json({
            e:'erreur lors de la récuperation de ce utilisateur'
        });
    }
}

const changepassword = async (req, res) =>{

}

module.exports = {
    changepassword:changepassword,
    deleteUser:deleteUser,
    getAllUsers:getAllUsers,
    updateMyProfile:updateMyProfile,
    getMyProfile:getMyProfile,
    getUserById:getUserById,
    getStats:getStats
}