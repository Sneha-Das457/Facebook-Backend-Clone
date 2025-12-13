const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer.middleware.js');
const verifyUser = require('../middlewares/user.middleware.js');
const  {
    createVideo,
    getVideo,
    editVideo,
    deleteVideo,
    togglePublicStatus
} = require('../controllers/video.controller.js');

router.post('/create-video', verifyUser, upload.fields([
    {
        name: 'videoFile',
        maxCount: 1
    },
    {
        name: 'thumbnail',
        maxCount: 1
    }
]), createVideo);




