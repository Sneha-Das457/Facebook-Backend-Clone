const cloudinary = require("cloudinary").v2;
const asyncHandler = require("../utils/asyncHandler.js")
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js")
const {
    uploadImgToCloudnary,
    uploadVideoToCloudnary
} = require("../config/cloudnary.js");

const uploadVideo = asyncHandler(async(req, res) =>{
    const {title, description} = req.body
    if(!title || !description){
        throw new apiError(400, "These fields are required")
    }

    const videoFilePath = req.files?.videoFile?.[0]?.path;
    if(!videoFilePath){
        throw new apiError(401, "Video file is required")
    }

    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path
    if(!thumbnailLocalPath){
        throw new apiError(400, "Thumbnail is required")
    }
})