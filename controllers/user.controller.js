const {User} = require('../models');
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
}

const changepassword = async (req, res) =>{

}

module.exports = {
    deleteMyProfile:deleteMyProfile,
    updateMyProfile:updateMyProfile,
    getMyProfile:getMyProfile,
    changepassword:changepassword,
}
