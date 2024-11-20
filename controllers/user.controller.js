const { User } = require('../models');
const bcryptjs = require('bcryptjs');

const getMyProfile = async (req, res) =>{
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
           return res.status(404).send({message:"User not found!"}); 
        }
        res.status(200).send(user);
    } catch (e) {
        return res.status(500).send({
            message:"Internal Server Error",
            error :e.message
        });
    }
}

const updateMyProfile = async (req, res) =>{
    const {name, email, tel} = req.body;
    try {
        const user = await User.update({name, email, tel}, {where : {id:req.user.id}});
        if (!user) {
           return res.status(404).send({message:"User not found!"}); 
        }
        res.status(200).send({message:"Profil updated successfully!"});
    } catch (e) {
        return res.status(500).send({
            message:"Internal Server Error",
            error :e.message
        });
    }
}

const deleteMyProfile = async (req, res) =>{
    try {
        const user = await User.destroy({where :{id:req.user.id}});
        if (!user) {
           return res.status(404).send({message:"User not found!"}); 
        }
        res.status(200).send({message:"User deleted successfully"});
    } catch (e) {
        return res.status(500).send({
            message:"Internal Server Error",
            error :e.message
        });
    }
};

const changepassword = async (req, res) => {
    const userId = req.user.id;
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;
    if (typeof old_password !== 'string' || typeof new_password !== 'string') {
        return res.status(400).send({
            message: 'Passwords must be strings'
        });
    }
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found in the server" });
        }
        const isMatch = await bcryptjs.compare(old_password, user.password); // comparaison asynchrone
        if (!isMatch) {
            return res.status(400).send({ message: "Old password is incorrect!" });
        }
        const salt = await bcryptjs.genSalt(10); // hasher le mdp
        const hash = await bcryptjs.hash(new_password, salt);
        user.password = hash; // mettre à jour le mdp
        await user.save();
        res.status(200).send({ message: "Password changed successfully!" });
    } catch (error) {
        res.status(500).send({
            message: 'Server internal error',
            error: error.message
        });
    }
};


module.exports = {
    deleteMyProfile:deleteMyProfile,
    updateMyProfile:updateMyProfile,
    getMyProfile:getMyProfile,
    changepassword:changepassword,
}
