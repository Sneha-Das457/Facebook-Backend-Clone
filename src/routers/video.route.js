const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer.middleware.js');
const verifyUser = require('../middlewares/user.middleware.js');
const  {
    createVideo,
    getVideo,
    gettAllVideos,
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

router.get("/all-videos", verifyUser, gettAllVideos);
router.get("/video/:videoId", verifyUser, getVideo);
router.put("/edit-video/:videoId", verifyUser, upload.single('thumbnail'), editVideo);
router.patch("/toggle-public-status/:videoId", verifyUser, togglePublicStatus);
router.delete("/delet-video/:videoId", verifyUser, deleteVideo);

module.exports = router;




