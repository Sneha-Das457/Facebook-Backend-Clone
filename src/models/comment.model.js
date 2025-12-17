const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const commentSchema = new Schema(
  {
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },

    commentBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    comment: {
      type: String,
      required: true,
    },

    turnedOffComment: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

commentSchema.plugin(aggregatePaginate);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
