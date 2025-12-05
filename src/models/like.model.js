const mongoose = require("mongoose")
const Schema = mongoose.Schema

const likeSchema = new Schema({
     
    Like:{
        type: Number,
        default: 0,
        required: true
    },

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