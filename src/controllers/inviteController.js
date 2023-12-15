const Invite = require('../models/inviteModel');
const User = require('../models/userModel');
const Group = require('../models/groupModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// exports.createInvite = async (req, res) => {
//     try{
//         let token = await req.headers['authorization'];
//         if(token !== undefined) {
//             const payload = await new Promise((resolve, reject) =>{
//                 jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
//                     if(error) {
//                         reject(error);
//                     } else {
//                         resolve(decoded);
//                     }
//                 })
//             })

//             req.group = payload;

//             try{
//                 const newInvite = new Invite({group_id: req.group.id, user_id: req.body});
                
//                 const user = await User.findOne({_id: req.body})

//                 if(!user){
//                     const hashPass = await bcrypt.hash(req.body.password, saltRounds);
            
//                     let newUser = new User({...req.body, password: hashPass, exist: 1});
//                     let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
//                     if(regex.test(req.body.email)){
//                         let user = await newUser.save();
//                         res.status(201).json({message: `Utilisateur crée: ${user.email}`});
//                     } else {
//                         res.status(401).json({message: "E-mail non valide"});
//                     }
//                     const inviteData = {
//                         id: newInvite._id,
//                         group_id: newInvite.group_id,
//                         user_id: newInvite.user_id,
//                         accept: newInvite.isAccept
//                     };
//                     const inviteToken = await jwt.sign(inviteData, process.env.JWT_KEY, {expiresIn: "10h"});
    
//                     const invite = await newInvite.save();
//                 } else {

//                     const inviteData = {
//                         id: newInvite._id,
//                         group_id: newInvite.group_id,
//                         user_id: newInvite.user_id,
//                         accept: newInvite.isAccept
//                     };
//                     const inviteToken = await jwt.sign(inviteData, process.env.JWT_KEY, {expiresIn: "10h"});
    
//                     const invite = await newInvite.save();
//                 }

//             } catch(error) {
                
//             }

//         } else {
//             res.status(403).json({message: "Token manquant"});
//         }
//     } catch(error) {

//     }
// }

exports.createInvite = async (req, res) => {
    try{
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

            const newInvite = new Invite({group_id: req.group.id, user_id: req.body.id});

            const user = User.findById({_id: req.body.id});
                
            const inviteData = {
                id: newInvite._id,
                group_id: newInvite.group_id,
                user_id: newInvite.user_id,
                accept: newInvite.isAccept
            };
            const inviteToken = await jwt.sign(inviteData, process.env.JWT_KEY, {expiresIn: "10h"});
    
            const invite = await newInvite.save();

            res.status(201).json({message: `Invitation crée avec succès, vous avez invité : ${user.email}. Token : ${inviteToken}`});
        } else {
            res.status(403).json({message: "Token manquant"});
        }
    } catch(error) {
        res.status(500).json({message: "Erreur serveur(inexistant)"});
    }
}

exports.acceptInvite = async (req, res) => {
    try{
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
            req.invite = payload;
            try{
                await Invite.findByIdAndUpdate(req.invite.id, {isAccept: true});

                const group = await Group.findById(req.invite.group_id);
                let array = group.members_id;
                array.push(req.invite.user_id);
                group.members_id = array;
                await Group.findByIdAndUpdate(req.invite.group_id, group);

                res.status(201).json({message: `Vous avez accepter la demande.`});

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

exports.refuseInvite = async (req, res) => {
    try{
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
            req.invite = payload;
            try{
                await Invite.findByIdAndUpdate(req.invite.id, {isAccept: false});

                res.status(201).json({message: `Vous avez refuser la demande.`});

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