const cloudinary = require("cloudinary").v2;
const asyncHandler = require("../utils/asyncHandler.js")
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js")
const Video = require("../models/video.model.js")
const {
    uploadImgToCloudnary,
    uploadVideoToCloudnary
} = require("../config/cloudnary.js");

const createVideo = asyncHandler(async(req, res) =>{
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

    try{
        const video = await uploadVideoToCloudnary(videoFilePath);
        const thumbnail = await uploadImgToCloudnary(thumbnailLocalPath)
    }catch(error){
        throw new apiError(500, error.message || "Falide to upload, try again later")
    }

    const videoUrl = video?.secure_url || video?.url 
    const thumbnailUrl = thumbnail?.secure_url || thumbnail?.url
    if(!videoUrl){
        throw new apiError(400, "Failed to upload to video: Url is missing from cloudnary")
    }

    if(!thumbnailUrl){
        throw new apiError(400, "Failed to upload image: Url is missing from cloudnary")
    }

    const uploadVideo = await Video.create({
        title,
        description,
        videoFile: video?.secure_url || video.url,
        videoFilePublicId: video?.public_id, 
        thumbnail: thumbnail?.secure_url || thumbnail.url,
        thumbnailPublicId: thumbnail.public_id,
        user: req.user._id
        

    });

    if(!uploadVideo){
        throw new apiError(500, "Video could not be created due to server issue")
    }

    return res.status(200).json(new apiResponse(200, "Video has been uploaded successfully"))
});

const getVideo = asyncHandler(async(req, res) =>{
    const {videoId} = req.params;
    if(!videoId){
        throw new apiError(400, "Invalid video Id")
    }

    const video = await Video.findById(videoId)
    if(!video){
        throw new apiError(401, "Video not found!")
    }

    return res.status(200).json(new apiResponse(200, "Video has been fetched successfully"))
});


const gettAllVideos = asyncHandler(async(req, res) =>{
    const { page = 1, limit = 10, query, userId } = req.query;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortType = req.query.sortType === "asc" ? 1: -1;

    const filter = {};
    if(userId) filter.owner = userId;
    if(query) filter.title = { $regex: query, $options: "i" };

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const video = await Video.find(filter)
    .sort({ [sortBy]: sortType})
    .skip((pageNum -1) *limitNum)
    .limit(limitNum);

    if(!video){
        throw new apiError(404, "there is no videos exist")
    }

    return res.status(200).json(new apiResponse(200, video, "All the videos has been fetched successfully"));

})


const editVideo = asyncHandler(async(req, res) =>{
    const {videoId} = req.params;
    const {title, description} = req.body;
    if(!videoId){
        throw new apiError(400, "Invalid video id")
    };
    const video = await Video.findById(videoId);
    if(!video){
        throw new apiError(404, "Video not found")
    }

    const newThumbnailFilePath = req.file?.path;
    if(!newThumbnailFilePath){
        throw new apiError(400, "Thumbnail is required")
    }
    
    if(video.thumbnailPublicId){
        try{

            await cloudinary.uploader.destroy(video.thumbnailPublicId, {resource_type: Image});

        }catch(error){
            throw new apiError(500, error.message, "Failed to delete old image")
        }
    }

    const newThumbnail = await uploadImgToCloudnary(newThumbnailFilePath)
    if(newThumbnail.secure_url){
        throw new apiError(500, "Failed to upload new thumbnail")
    }

    const update = {}
    if(title) update.title = title;
    if(description) update.description = description;
    update.thumbnail = newThumbnail.secure_url;
    update.thumbnailPublicId = newThumbnail.public_id

    const updateVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: update
        },
        {new: true}
    ); 

    return res.status(200).json(new apiResponse(200, updateVideo, "Your video has been updated sucessfully"))

})

const deleteVideo = asyncHandler(async(req, res) =>{
    const {videoId} = req.params;
    if(!videoId){
        throw new apiError(400, "Video is not provided")
    }

    const video = await Video.findById(videoId);
    if(!video){
        throw new apiError(401, "Video not found")
    }

    if(video.thumbnailPublicId){
        try{
            await cloudinary.uploader.destroy(video.thumbnailPublicId, {resource_type: Image})
        }catch(error){
            throw new apiError(500, error.message, "Failed to delete thumbnail from cloudnary")
        }
    };

    if(video.videoPublicId){
        try{
            await cloudinary.uploader.destroy(video.videoPublicId, {resource_type: video})
        }catch(error){
            throw new apiError(500, error.message, "Failed to delete video from cloudnary")
        }
    };

    await Video.findByIdAndDelete(videoId);

    return res.status(200).json(new apiResponse(200, "", "Your Video has been deleted successfully"))

});

const togglePublicStatus = asyncHandler(async(req, res) =>{
    const {videoId} = req.params
    const video = await Video.findById(videoId)
    if(!video){
        throw new apiError(404, "Video not found")
    }

    video.isPublished = !video.isPublished;
    await video.save()

    return res.status(200).json(new apiResponse(200, video, "Published has been toggled successfully"))
})

module.exports = {
    
    createVideo,
    getVideo,
    editVideo,
    deleteVideo,
    togglePublicStatus
}