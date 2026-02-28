const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShareSchema = new Schema(
  {
    sharedVideo: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    sharedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sharedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

ShareSchema.index(
  { sharedVideo: 1, sharedBy: 1, sharedTo: 1 },
  { unique: true },
);

const Share = mongoose.model("Share", ShareSchema);
module.exports = Share;
