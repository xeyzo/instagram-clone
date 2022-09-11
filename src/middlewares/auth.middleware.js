import jwt from "jsonwebtoken";


export const authentication = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.send({message: "You must be logged in"}).status(401)
    }

    const token = authorization.replace(`Bearer `,``)
    
    try {
        const credential = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(credential){
            req.app.locals.credential = credential

            return next()
        }
        res.send(`invalid token`)
    } catch (error) {
        res.send({message:error}).status(401)
    }    
}