import Post from "../models/post.model.js";



export const allPost = (req,res) => {

    Post.find()
    .populate('postedBy',"_id name")
    .then(posts => {
        res.send({
            message:"Success get all data post",
            data:posts
        }).status(200)
    }).catch(err => {
        console.log(err)
    })
}

export const createPost = (req, res) => {
    const { title, body, photo} = req.body;

    if(!title || !body || !photo ){
        return res.json({
            messageError:"Please add all fields"
        }).status(401)
    }

    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo,
        postedBy:req.user 
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

export const mypost = (req,res) => {
    Post.find({postedBy:req.user._id})
    .populate('postedBy', '_id name')
    .then(postme => {
        res.send({
            message:"all my post",
            data:postme
        }).status(200)
    }).catch(err =>{
        console.log(err)
    })
}