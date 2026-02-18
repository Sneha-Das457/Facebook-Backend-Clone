const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/user.middleware.js");
const {
  toggleVideoLike,
  toggleCommentLike,
  toggleLikePublicStatus,
  fetchLikedVideos,
} = require("../controllers/like.controller.js");


router.post("/video-like/:videoId", verifyUser, toggleVideoLike);
router.post("/comment-like/:commentId", verifyUser, toggleCommentLike);

router.patch(
  "/toggle-like-public-status/:videoId",
  verifyUser,
  toggleLikePublicStatus
);
router.get("/liked-videos", verifyUser, fetchLikedVideos);

module.exports = router;
