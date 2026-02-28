const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/user.middleware.js");
const {
    toggleShare
} = require("../controllers/share.controller.js");

router.post("/toggle-share/:videoId", verifyUser, toggleShare);

module.exports = router;