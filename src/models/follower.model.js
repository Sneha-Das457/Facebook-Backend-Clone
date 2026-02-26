const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followerSchema = new Schema(
  {
    follwedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    follwedProfile: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

followerSchema.index({ follwedBy: 1, follwedProfile: 1 }, { unique: true });

const Follwer = mongoose.model("Follwer", followerSchema);
module.exports = Follwer;
