const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_KEY;
require('dotenv').config();

exports.verifyToken = async (req, res, next) => {
    try{
        const token = req.headers['authorization'];


        if(token !== undefined) {
            const payload = await new Promise((resolve, reject) =>{
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                })
            })

            req.user = payload;
            next();

        } else {
            res.status(403).json({message : "Accès interdit : token manquant"});
        }
    } catch(error) {
        res.status(403).json({message: "Accès interdit: token invalide"});
    }
}