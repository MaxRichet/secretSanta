const User = require('../models/userModel');
const Group = require('../models/groupModel');
const Invite = require('../models/inviteModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = 10;


exports.userRegister = async (req, res) => {
    try{
        const hashPass = await bcrypt.hash(req.body.password, saltRounds);
            
        let newUser = new User({...req.body, password: hashPass, exist: true});
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(regex.test(req.body.email)){
            let user = await newUser.save();
            res.status(201).json({message: `Utilisateur crée: ${user.email}`});
        } else {
            res.status(401).json({message: "E-mail non valide"});
        }
    } catch(error) {
        console.log(error);
        res.status(401).json({message: "Requête invalide"});
    }
    
}

exports.userLogin = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            res.status(500).json({message: "utilisateur non trouvé"});
            return;
        }
        const comparePass = bcrypt.compare(req.body.password, user.password);
        if(user.email === req.body.email && comparePass) {
            const userData = {
                id: user._id,
                email: user.email,
                role: user.role
            };
            const token = await jwt.sign(userData, process.env.JWT_KEY, {expiresIn: "10h"});
            res.status(200).json({token});
        } else {
            res.status(401).json({message: 'Email ou password incorrect'});
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Une erreur s'est produite lors du traitement."})
    }
}

exports.userDelete = async (req, res) => {
    try {
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
            
            req.user = payload;
            
            const a = await Group.find({});
            const b = await Invite.find({});

            for(i = 0; i < a.length; i++){
                if(req.user.id == a[i].admin_id){
                    await Group.findByIdAndDelete(a[i]._id);
                }
            }
            for(i = 0; i < b.length; i++){
                if(req.user.id == b[i].user_id){
                    await Invite.findByIdAndDelete(b[i]._id);
                }
            }

            await User.findByIdAndDelete(req.user.id);
            res.status(200).json({message: 'Compte supprimé'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'erreur serveur'});
    }
}