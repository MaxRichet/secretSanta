const Group = require('../models/groupModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createGroup = async (req, res) => {
    try{
        let token = await req.headers['authorization'];
        if(token !== undefined) {
            const payload = await new Promise((resolve, reject) =>{
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if(error) {
                        console.log('suu');
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                })
            })

            req.user = payload;
            try{
                const newGroup = new Group({admin_id: req.user.id});
                
                const group = await newGroup.save();

                const groupData = {
                    id: newGroup._id,
                    admin_id: newGroup.admin_id
                };
                const groupToken = await jwt.sign(groupData, process.env.JWT_KEY, {expiresIn: "24h"});

                res.status(201).json(`Votre groupe à bien été créer ${req.user.email}. Token : ${groupToken}`);
            } catch(error) {
                res.status(500).json({message: "Erreur serveur"});
            }
        } else {
            res.status(403).json({message: "Token manquant"});
        }
    } catch(error) {
        res.status(500).json({message: "Erreur serveur(inexistant)"});
    }
}