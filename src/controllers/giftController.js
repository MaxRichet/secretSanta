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

                groupT.members_id = result;
                await Group.findByIdAndUpdate({_id: req.group.id}, groupT);

                res.status(201).json(result);

            } catch(error) {
                res.status(500).json({message: "Erreur serveur"});
            }
        } else {
            res.status(403).json({message: "Token manquant"});
        }
}

exports.adminList = async (req, res) => {
    let token = await req.headers['authorization'];
    let tokenUser = await req.headers['user'];
        if(token !== undefined && tokenUser !== undefined) {
            const payload = await new Promise((resolve, reject) =>{
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                })
            })
            const payloadUser = await new Promise((resolve, reject) =>{
                jwt.verify(tokenUser, process.env.JWT_KEY, (error, decoded) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                })
            })
            req.group = payload;
            req.user = payloadUser;
            try{
                const group = await Group.findOne({_id: req.group.id});
                if(req.user.id == group.admin_id) {
                    let result = [];
                    for(i = 0, u = 1; i < group.members_id.length; i++, u++) {
                        result.push(`Groupe ${u} : giver - ${group.members_id[i].giver} ~ receiver - ${group.members_id[i].receiver}`);
                    }
                    res.status(201).json({message: `Voici la liste des groupes : ${result}`});
                } else {
                    res.status(500).json({message: `Vous n'êtes pas autorisé à voir la liste de ce groupe`});
                }

            } catch(error) {
                res.status(500).json({message: "Erreur serveur"});
            }
        } else {
            res.status(403).json({message: "Token manquant"});
        }
}

exports.findMyReceiver = async (req, res) => {
    let token = await req.headers['authorization'];
    let tokenUser = await req.headers['user'];
        if(token !== undefined && tokenUser !== undefined) {
            const payload = await new Promise((resolve, reject) =>{
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                })
            })
            const payloadUser = await new Promise((resolve, reject) =>{
                jwt.verify(tokenUser, process.env.JWT_KEY, (error, decoded) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                })
            })
            req.group = payload;
            req.user = payloadUser;
            try{
                const group = await Group.findOne({_id: req.group.id});
                if(req.user.id == group.admin_id) {
                    for(i = 0; i < group.members_id.length; i++) {
                        if(group.members_id[i].giver == req.user.id)
                            res.status(201).json({message: `Vous devez offrir un cadeau à ${group.members_id[i].receiver}`});
                    }
                    res.status(403).json({message: `Vous n'êtes pas dans ce groupe`});
                } else {
                    res.status(500).json({message: `Vous n'êtes pas autorisé à voir la liste de ce groupe`});
                }

            } catch(error) {
                res.status(500).json({message: "Erreur serveur"});
            }
        } else {
            res.status(403).json({message: "Token manquant"});
        }
}