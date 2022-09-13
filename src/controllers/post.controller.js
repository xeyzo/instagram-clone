import Post from "../models/post.model.js";


export const createPost = (req, res) => {
    const { title, body } = req.body;

    if(!title || !body ){
        return res.send({
            message:"Please add all fields"
        }).status(401)
    }

    const post = new Post({
        title,
        body,
        postedBy:req.user.name
    })

    post.save()
    .then(postData => {
        res.send({
            message:"success saved data",
            data:postData
        }).status(200)
    }).catch(err => {
        res.send({message : err}).status(401)
    })

}