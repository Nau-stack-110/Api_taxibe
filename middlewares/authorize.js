const jwt = require('jsonwebtoken');
const CheckToken = (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(403).send({message:"veullez vous connecter"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        console.log(decoded);
        next();
    } catch (e) {
    return res.status(400).send({
        message:"Invalid token or expire token!",
        error:e.message
    }) 
    }
}

const CheckAdmin = (req, res, next) =>{
    const { role } = req.user;
    console.log(role);
    if (role !== 1) {
        return res.status(400).send({message:"Admin access only <__>"})
    }
    next();
}

const CheckUser = (req, res, next) =>{
    const { role} = req.user;
    console.log(role);
    if (role !== 2) {
       return res.status(400).send({message:"User access only <__>"})
    }
    next();
}

module.exports = {
    CheckToken,
    CheckAdmin, 
    CheckUser,
}