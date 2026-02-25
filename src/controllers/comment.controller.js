const Comment = require("../models/comment.model.js");
const Video = require("../models/video.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const apiResponse = require("../utils/apiResponse.js");
const apiError = require("../utils/apiError.js");
const { default: mongoose } = require("mongoose");

const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { videoId } = req.params;
  const { userId } = req.user._id;

  /*console.log(req.body);
  console.log(req.user);
  console.log(req.user._id);*/

  if (!content) {
    throw new apiError(400, "Content is required");
  }

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Invalid video id");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(400, "Video not found");
  }

  const comment = await Comment.create({
    comment: content,
    video: videoId,
    commentBy: req.user._id,
  });

  return res
    .status(200)
    .json(new apiResponse(200, comment, "Comment added successfully"));
});

const editComment = asyncHandler(async (req, res) => {
  const { content, videoId } = req.body;
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Invalid video id");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(400, "Video not found");
  }

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new apiError(400, "Invalid comment id");
  }
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new apiError(400, "Comment not found");
  }

  if (comment.video._id.toString() !== video._id.toString()) {
    throw new apiError(400, "This comment is not belong to this video");
  }

  if (comment.commentBy._id.toString() !== req.user._id.toString()) {
    throw new apiError(
      400,
      "You re not the owner of this comment, you can't edit this",
    );
  }

  comment.comment = content;

  await comment.save();

  return res
    .status(200)
    .json(new apiResponse(200, comment, "Comment edited successfully"));
});

const getcomment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Invalid video id");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(400, "Video not found");
  }

  const comment = await Comment.find({ video: videoId }).populate(
    "commentBy",
    "name email ",
  );

  if (!comment || comment.length === 0) {
    throw new apiError(400, "There is no comment exist in this video");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        comment,
        "The comment has been fetched successfully",
      ),
    );
});

const getAllComments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, commentId } = req.query;
  const sortBy = req.query.sortBy || "createdAt";
  const sortType = req.query.sortType === "asc" ? 1 : -1;

  const filter = {};
  if (commentId) filter._id = commentId;
  if (query) filter.comment = { $regex: query, $options: "i" };

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const comment = await Comment.find(filter)
    .sort({ [sortBy]: sortType })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  if (!comment || comment.length === 0) {
    throw new apiError(400, "There is no comment exist");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        comment,
        "These are all the comments you have written",
      ),
    );
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

  if (video.owner._id.toString() !== req.user._id.toString()) {
    throw new apiError(
      404,
      "You are not the owner of this video, you can't remove the comment",
    );
  }

  await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(
      new apiResponse(200, null, "The comment has been deleted successfully"),
    );
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
      "You are not the owner of this video, you can't change the setting",
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
        "The comment section of this video has been turned off successfully",
      ),
    );
});

module.exports = {
  addComment,
  editComment,
  getcomment,
  getAllComments,
  deleteComment,
  disabeledCommentSection,
};
