const {Role, User} = require('../models');
const bcrypt = require('bcryptjs');
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

module.exports = {
    createAdmin
}
