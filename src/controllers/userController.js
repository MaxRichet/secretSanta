const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.userRegister = async (req, res) => {
    try{
        let newUser = new User(req.body);
        let user = await newUser.save();
        res.status(201).json({message: `Utilisateur crée: ${user.email}`});
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
        if(user.email === req.body.email && user.password === req.body.password) {
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
            
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json({message: 'Compte supprimé'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'erreur serveur'});
    }
}