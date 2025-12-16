const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  updateProfile,
  removeProfile,
  deleteAccount,
  getExistingUser,
  updateAccount,
  seeProfile,
} = require("../controllers/user.controller.js");
const upload = require("../middlewares/multer.middleware.js");
const verifyUser = require("../middlewares/user.middleware.js");

router.post(
  "/register",
  upload.fields([
    {
      name: "Profile",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.post("/login", loginUser);
router.post("/logot", verifyUser, logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", verifyUser, changePassword);

router.patch(
  "/update-profile",
  verifyUser,
  upload.single("profile"),
  updateProfile
);
router.patch("/update-account", verifyUser, updateAccount);

router.delete("/remove-profile", verifyUser, removeProfile);
router.delete("/delete-account", verifyUser, deleteAccount);

router.get("/existing-user", getExistingUser);
router.get("/see-profile", verifyUser, seeProfile);

module.exports = router;
