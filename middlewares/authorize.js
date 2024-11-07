// const jwt = require('jsonwebtoken');
// const CheckToken = async (req, res, next) =>{
//     try {
//         const token = req.headers && req.headers.authorization.split(' ')[1];
//         if (!token) {
//             return res.status(400).send({message:"Pas de token, veuillez vous connecter!"});
//         }
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         req.user = decoded;
//         next();
//     } catch (e) {
//     return res.status(500).send({
//         message:"Invalid token or expire token!",
//         error:e.message
//     }) 
//     }
// }

// const CheckUser= async (req, res, next) =>{
//     const {role_id} = req.user;
//     console.log(role_id);
//     if (role_id !== 2) {
//        return res.status(200).send({message:"User access only <__>"})
//     }
//     next();
// }

// const CheckAdmin = async (req, res, next) =>{
//     const {role_id} = req.user;
//     console.log(role_id);
//     if (role_id !== 1) {
//         return res.status(200).send({message:"Admin access only <__>"})
//     }
//     next();
// }

// module.exports = {
//     CheckToken,
//     CheckAdmin, 
//     CheckUser,
// }