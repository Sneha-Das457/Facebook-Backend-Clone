const express = require('express');
const router = express.Router();
const {
    toggleVideoLike,
    toggleCommentLike,
    toggleLikePublicStatus,
    fetchLikedVideos
} = require('../controllers/like.controller.js');
const verifyUser = require('../middlewares/user.middleware.js');
router.post('/video-like/:videoId', verifyUser, toggleVideoLike);
router.post('/comment-like/:commentId', verifyUser, toggleCommentLike);
