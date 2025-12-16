const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/user.middleware.js");
const {
  toggleFollwers,
  getProfileFollwers,
  getFollwingAccounts,
} = require("../controllers/comment.controller.js");

router.post("/:profileId/toggle", verifyUser, toggleFollwers);
router.get("/:profileId/follwers", verifyUser, getProfileFollwers);
router.get("/follwing/accounts", verifyUser, getFollwingAccounts);

module.exports = router;
