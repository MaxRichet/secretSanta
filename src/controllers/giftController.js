const Invite = require('../models/inviteModel');
const User = require('../models/userModel');
const Group = require('../models/groupModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.secretSanta = async (req, res) => {
    

    let token = await req.headers['authorization'];
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
            req.group = payload;
            try{
                let array = [];
                let result = [];
               
                const groupT = await Group.findOne({_id: req.group.id});
                
                array = groupT.members_id;
                array.push(req.group.admin_id);
                
                for(let i = 0; i < array.length - 1; i++){
                    result.push({
                        giver: array[i],
                        receiver: array[i + 1]
                    })
                }
                result.push({
                    giver: array[array.length - 1],
                    receiver: array[0]
                })

                res.status(201).json(result);

            } catch(error) {
                res.status(500).json({message: "Erreur serveur"});
            }
        } else {
            res.status(403).json({message: "Token manquant"});
        }
}