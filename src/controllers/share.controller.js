const Share = require("../models/share.model.js");
const Video = require("../models/video.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const apiResponse = require("../utils/apiResponse.js");
const apiError = require("../utils/apiError.js");
const mongoose = require("mongoose");

const toggleShare = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;
  const { shareToId } = req.body;

  if (!videoId || !userId) {
    throw new apiError(400, "Id's are required");
  }

  if (!shareToId) {
    throw new apiError(400, "this field is required");
  }

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Invalid video ID");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(404, "Video not found");
  }

  const existShare = await Share.findOne({
    sharedVideo: videoId,
    sharedBy: userId,
    sharedTo: shareToId,
  });

  if (existShare) {
    await Share.deleteOne(existShare._id);
    return res
      .status(200)
      .json(new apiResponse(200, null, "Shared removed successfully"));
  }

  await Share.create({
    sharedVideo: videoId,
    sharedBy: userId,
    sharedTo: shareToId,
  });

  return res
    .status(200)
    .json(new apiResponse(200, null, "You shared this video successfully"));
});

module.exports = {
  toggleShare,
};
