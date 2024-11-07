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
const register = async (res, req) =>{
    const {name, email, tel, password, image} = req.body;
    try {
        let userRole = await Role.findOne({where: {rolename:'User'}});
        if (!userRole) {
            userRole = await Role.create({rolename:'User', roledesc:'Utilisateur simple'});
            console.log("Role User créé avec succès");
        }else{
            console.log("Role User déja existant");
        }
        let user = await User.findOne({ where: {email} });
        if (!user) {
            const salt = bcrypt.genSalt(10);
            const hash = bcrypt.hash({password}, salt);
            user = await User.create({
                name,
                email,
                password:hash,
                tel,
                image,
                role_id:userRole.id
            });
            console.log("User créé avec succès!");
        }else{
            console.log('User existe déja!');
        }
    } catch (e){
        console.log('Erreur lors de la creation de l\'utilisateur:', e.message || e);
    }
}


// const login = async (res, req) =>{
//     const {email, password} = req.body;
//     try {
//         const user = await User.findOne({where: {email}});
//         if (!user) {
//             return res.status(404).send({message:"Identifiants Incorrectes"});
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch){
//             return res.status(400).send({message:"password incorrect"});
//         }
//         const token = jwt.sign({
//             id:user.id, email:user.email, name:user.name, role:user.role_id,
//         }, process.env.SECRET_KEY, {expiresIn:'1h'});
//         res.status(200).send({token, message:"Successfully login"});
//     } catch (e) {
//         return res.status(500).send({
//             message:"Internal Server Error",
//             error :e.message
//         })
//     }
// }

// const logout = async (res, req) =>{

// }

// const resetpassword = async (res, req) =>{

// }

// const forgotpassword = async () =>{

// }

module.exports = {
    createAdmin,
    // login, 
    register,
    // logout,
    // resetpassword,
    // forgotpassword
}
