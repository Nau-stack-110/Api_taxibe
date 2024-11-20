const {Role, User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createAdmin = async () =>{
    try {
        let adminRole = await Role.findOne({where: {rolename:'Admin'}});
        if (!adminRole) {
            adminRole = await Role.create({rolename:'Admin', roledesc:'Administrateur du systeme'});
            console.log("Role Admin créé avec succès");
        }else{
            console.log("Role Admin déja existant");
        }
        let admin = await User.findOne({ where: {email:process.env.ADMIN_EMAIL } });
        if (!admin) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
            admin = await User.create({
                name:process.env.ADMIN_NAME,
                email:process.env.ADMIN_EMAIL,
                password:hash,
                tel:process.env.ADMIN_TEL,
                role_id:adminRole.id
            });
            console.log("Admin créé avec succès!");
        }else{
            console.log('Admin existe déja!');
        }
    } catch (e){
        console.log('Erreur lors de la vérification/creation de l\'admin:', e.message || e);
    }
}

const register = async (req, res) =>{
    try {
        let userRole = await Role.findOne({where: {rolename:'User'}});
        if (!userRole) {
            userRole = await Role.create({rolename:'User', roledesc:'Utilisateur simple'});
            console.log("Role User créé avec succès");
        }else{
            console.log("Role User déja existant");
        }
        let user = await User.findOne({ where: {email: req.body.email} });
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            useraiditra = {
                name:req.body.name,
                email:req.body.email,
                password:hash,
                tel:req.body.tel,
                image:req.body.image,
                role_id:userRole.id
            }
            user = await User.create(useraiditra); 
            console.log("User créé avec succès!");
            res.status(201).send({message:"User créé avec succes", user});
        }else{
            console.log('User existe déja!');
            res.status(400).send({message:"User existe déja"});
        }
    } catch (e){
        console.log('Erreur lors de la creation de l\'utilisateur:', e.message || e);
    }
} 

const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send({message:"password incorrect"});
        }
        const token = jwt.sign({
            id:user.id, name:user.name, email:user.email, role:user.role_id,
        }, process.env.SECRET_KEY, {expiresIn:'1h'});
        res.status(200).send({token, message:"Successfully login"});
    } catch (e) {
        return res.status(500).send({
            message:"Internal Server Error",
            error :e.message
        })
    }
}

const forgotpassword = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ where: { email:email } });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const pinCode = Math.floor(100000 + Math.random() * 900000);
        user.resetPin = pinCode;
        user.pinExpiry = Math.floor(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save();
        return res.status(200).send({
            message: "PIN generated successfully, it will expired in 10 minutes",
            pin: pinCode 
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        });
    }
};

const resetpassword = async (req, res) => {
    const { email, pin, newPassword } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        if (user.resetPin !== pin || user.pinExpiry < Date.now()) {
            return res.status(400).send({ message: "Invalid or expired PIN" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        user.resetPin = null;
        user.pinExpiry = null;
        await user.save();
        return res.status(200).send({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        });
    }
};

// const logout = async (res, req) =>{

// }

module.exports = {
    createAdmin,
    login, 
    register,
    resetpassword,
    forgotpassword,
    // logout,
}
