const Comment = require("../models/comment.model.js");
const Video = require("../models/video.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const apiResponse = require("../utils/apiResponse.js");
const apiError = require("../utils/apiError.js");

const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { videoId } = req.params;
  const { userId } = req.user._id;

  if (!content) {
    throw new apiError(400, "Content is required");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(400, "Video not found");
  }

  const comment = await Comment.create({
    content,
    videoId,
    userId,
  });

  return res
    .status(200)
    .json(new apiResponse(200, comment, "Comment added successfully"));
});

const editComment = asyncHandler(async (req, res) => {
  const { content, videoId } = req.body;
  const { commentId } = req.params;

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(400, "Video not found");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new apiError(400, "Comment not found");
  }

  if (comment.video._id.toString() !== video._id.toString()) {
    throw new apiError("This comment is not belong to this video");
  }

  comment.content = content;
  await comment.save();

  return res
    .status(200)
    .json(new apiResponse(200, comment, "Comment edited successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { videoId } = req.body;
  const { commentId } = req.params;

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(200, "Video not found");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new apiError(401, "Comment not found");
  }

  if (comment.video._id.toString() !== video._id.toString()) {
    throw new apiError(404, "This comment does't belong to this video");
  }

  await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new apiResponse(200, null, "Comment has been deleted successfully"));
});

const disabeledCommentSection = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(404, "Video not found");
  }

  if (video.owner._id.toString() !== userId.toString()) {
    throw new apiError(
      404,
      "You are not the owner of this video, you can't change the setting"
    );
  }

  video.turnedOffComment = !video.turnedOffComment;
  await video.save();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        null,
        "The comment section of this video has been turned off successfully"
      )
    );
});

module.exports = {
  addComment,
  editComment,
  deleteComment,
  disabeledCommentSection,
};
