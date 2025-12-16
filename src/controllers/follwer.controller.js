const Follwer = require("../models/follower.model");
const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");

const toggleFollwers = asyncHandler(async (req, res) => {
  const { profileId } = req.params;
  const { followerId } = req.user._id;

  if (profileId.toString() === followerId.toString()) {
    throw new apiError(400, "This is your own Id, you can't follow it");
  }

  const existFollwer = await Follwer.findOne({
    follwer: follwerId,
    profile: profileId,
  });

  if (existFollwer) {
    await Follwer.deleteOne({
      _id: existFollwer._id,
    });

    return res
      .status(200)
      .json(new apiResponse(200, null, "You unfollwed this account"));
  }

  return res
    .status(200)
    .json(new apiResponse(200, null, "You started follwing this account"));
});

const getProfileFollwers = asyncHandler(async (req, res) => {
  const { profileId } = req.params;

  const followers = await Follwer.find({ profile: profileId }).populate(
    "follwer",
    "user"
  );

  if (followers.length === 0) {
    throw new apiError(400, null, "This profile has no follwers");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        null,
        "this profile's follwers has been fetch successfully"
      )
    );
});

const getFollwingAccounts = asyncHandler(async (req, res) => {
  const { follwerID } = req.user._id;

  const follwingAccounts = await Follwer.find({
    follwer: follwingID,
  }).populate("follwer", "username");

  if (follwingAccounts.length === 0) {
    throw new apiError(400, "You haven't follwed any accounts yet..");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        follwingAccounts,
        "All the follwed Accounts has been fetch successfully"
      )
    );
});

module.exports = {
  toggleFollwers,
  getProfileFollwers,
  getFollwingAccounts,
};
