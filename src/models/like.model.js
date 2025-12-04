const mongoose = require("mongoose")
const Schema = mongoose.Schema

const likeSchema = new Schema({


    video:{
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comment:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    


}, {timestamps: true})
const Like = mongoose.model("Like", likeSchema);
module.exports = Like