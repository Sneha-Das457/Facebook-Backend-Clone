const mongoose = require("mongoose");
const Schema = mongoose.Schema
const mongooseAgreegatePaginate = require("mongoose-agregate-paginate-v2")

const videoSchema = new Schema({
    
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
    videoFile:{
        type: String,
        required: true
    },
    videoPublicId:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    thumbnailPublicId:{
        type: String

    },
    duration:{
        type: Number,
        default: 0
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
}, {timestamps: true})

videoSchema.plugin(mongooseAgreegatePaginate)
const Video = mongoose.model("Video", videoSchema)
module.exports = Video