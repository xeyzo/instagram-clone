import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    postedBy:{
        type: ObjectId,
        ref:"User"
    }
})

export default mongoose.model("Post", postSchema)