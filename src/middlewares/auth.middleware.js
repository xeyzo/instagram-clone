import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authentication = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.send({message: "You must be logged in"}).status(401)
    }

    const token = authorization.replace(`Bearer `,``)
    const credential = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload ) => {
        if(err){
            return res.send({message:"You must be logged in"})
        }
        const _id = payload
        User.findById(_id).then(userData =>{
            req.user = userData

            next()
        })
    });

}