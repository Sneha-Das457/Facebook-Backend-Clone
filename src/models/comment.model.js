const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongooseAgreegatePaginate = require ("mongoose-agreegate-paginate");

const commentSchema = new Schema({
    video:{
        type: Schema.Types.ObjectId,
        ref: "Video"
    },

    commentBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    comment:{
        type: String,
        required: true
    }
}, {timestamps: true})

commentSchema.plugin(mongooseAgreegatePaginate);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment