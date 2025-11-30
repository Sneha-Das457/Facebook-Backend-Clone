const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const followerSchema = new Schema({
    follwer:{
        type: Number,
        default: 0
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

const Follwer = mongoose.model("Follwer", followerSchema);
module.exports = Follwer