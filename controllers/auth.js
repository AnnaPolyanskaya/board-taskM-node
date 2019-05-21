const errorHandler = require('../utils/errorHandler')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const keys = require('../config/keys')
const User = require('../models/User')

module.exports.register = async (req, res) => {
    try{
        const salt = bcrypt.genSaltSync(10)
        bcrypt.hash(req.body.password, salt, (error, hash) => {
            if(error){
                res.status(500).json({
                    error
                })
            } else {
                const candidate = new User({
                    _id: new mongoose.Types.ObjectId,
                    email: req.body.email,
                    password: hash
                })
                User.findOne({
                    email: candidate.email
                }, (error, user) => {
                        if(error){
                            errorHandler(res, error)
                        }
                        if(user){
                            res.status(403).json({
                                error: 'User alseady exists'
                            })
                        } else {
                            candidate.save()
                                .then(result => {
                                    console.log(result)
                                    res.status(201).json({
                                        message: 'User successfully created'
                                    })
                                })
                                .catch(error => {
                                    errorHandler(res, error)
                                })
                        }
                } )
                
                
            }
        })
    } catch(error){
        errorHandler(res, error)
    }
}


module.exports.login = async (req, res) => {
    
    const candidate = await User.findOne({
        email: req.body.email
    })

    console.log(candidate)

    if(candidate){
        const passMatch = bcrypt.compareSync(req.body.password, candidate.password)
        if(passMatch){
            // Token generation
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 60*60 })

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                error: "Invalid password"
            })
        }
    } else {
        res.status(404).json({
            error: "User with this email is not not found"
        })
    } 
}