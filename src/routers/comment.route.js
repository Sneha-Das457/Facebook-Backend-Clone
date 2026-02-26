const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/user.middleware.js");
const {
  addComment,
  editComment,
  getcomment,
  getAllComments,
  deleteComment,
  disabeledCommentSection,
} = require("../controllers/comment.controller.js");

router.post("/add-comment/:videoId", verifyUser, addComment);
router.patch("/edit-comment/:commentId", verifyUser, editComment);
router.patch(
  "/disable-comment-section/:videoId",
  verifyUser,
  disabeledCommentSection
);
router.get("/get-comment/:commentId", getcomment);
router.get("/get-all-comments", getAllComments);
router.delete("/delete-comment/:commentId", verifyUser, deleteComment);

module.exports = router;
