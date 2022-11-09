import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signup =  (req, res) => {
    const { name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({
            messageError:"Please add all fields"
        }).status(400)
    }

    User.findOne({email:email})
    .then((user)=>{
         if(user){
            return res.json({
                messageError:"User already exist"
            }).status(400)
         }
         bcrypt.hash(password, 12)
         .then(passwordHash => {
            const data = new User({
                name, email, password:passwordHash
             })
    
             data.save()
             .then(user =>{
                res.json({
                    message:"User success saved",
                    data:user
                }).status(200)
             }).catch(error => {
                res.json({
                    messageError:"User failed save",
                    detailError: error
                })
             })
         })


    })
}

export const signin = (req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.send({
            errorMessage:"Please input email and password"
        })
    }

    User.findOne({email:email})
    .then(user =>{
        if(!user){
            return res.send({
                errorMessage:"User not found"
            })
        }
        bcrypt.compare(password, user.password)
        .then(match=>{
            if(match){
                const token = jwt.sign({email:user.email, password:user.password},process.env.JWT_SECRET_KEY)
                const {_id,email,name} = user
                res.send({
                    token:token,
                    user:{_id, email, name}
                })
            }else{
                return res.send({errorMessage:"login invalid"})
            }
        }).catch(err =>{
            res.send({message:err})
        })
    })
}

export const getProfil =  (req, res) => { 
    User.find({_id: req.params.id})
    .then(data => {
        console.log(req.user)
        res.send({
            message:"get profil success",
            data:data
        }).status(200)
    }).catch( err => {
        res.send({message:err})
    })
} 