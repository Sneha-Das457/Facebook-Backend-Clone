const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followerSchema = new Schema(
  {
    follwer: {
      type: Number,
      default: 0,
    },

    profile: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    follwing: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Follwer = mongoose.model("Follwer", followerSchema);
module.exports = Follwer;
