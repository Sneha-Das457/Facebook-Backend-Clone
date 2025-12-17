const Like = require("../models/like.model.js");
const Video = require("../models/video.model.js");
const Comment = require("../models/comment.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const apiResponse = require("../utils/apiResponse.js");
const apiError = require("../utils/apiError.js");

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(400, "Video not found");
  }

  const existLike = await Like.findOne({
    video: videoId,
    user: userId,
  });

  if (existLike) {
    await Like.findOne({
      _id: existLike._id,
    });

    return res.status(200).json(new apiResponse(200, null, "Unlike the video"));
  }

  await Like.create({
    video: videoId,
    user: userId,
  });

  return res
    .status(200)
    .json(new apiResponse(200, null, "You liked the video"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { CommentId } = req.params;
  const userId = req.user._id;

  const comment = await Comment.findById(CommentId);
  if (!comment) {
    throw new apiError(400, "Comment not found");
  }

  const existLikedCommemt = await Like.findOne({
    video: videoId,
    comment: CommentId,
  });

  if (existLikedCommemt) {
    await Like.deleteOne({
      _id: existLikedCommemt._id,
    });

    return res
      .status(200)
      .json(new apiResponse(200, null, "Unlike the commet"));
  }

  await Like.create({
    user: userId,
    comment: CommentId,
  });

  res.status(200).json(new apiResponse(200, null, "Liked the comment"));
});

const toggleLikePublicStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(400, "Video not found");
  }

  if (video.owner.toString() !== userId) {
    throw new apiError(
      400,
      "You are not the owner, you can not change the visibility"
    );
  }

  video.isLikeCountPublic = !video.isLikeCountPublic;
  await video.save();

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        "Your video's like count visibility has been updated successfully"
      )
    );
});

const fetchLikedVideos = asyncHandler(async (req, res) => {
  const user = req.use._id;

  const videos = await Like.find({ user: userId }).populate(
    "user",
    "userName, email"
  );
  if (videos.length === 0) {
    throw new apiError(404, "No videos found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, videos, "All liked has been fetched successfully")
    );
});

module.exports = {
  toggleVideoLike,
  toggleCommentLike,
  toggleLikePublicStatus,
  fetchLikedVideos,
};
