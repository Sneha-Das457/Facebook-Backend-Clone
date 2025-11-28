const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const uploadImgToCloudnary = require("../config/cloudnary.js");
const upload = require("../middlewares/multer.middleware.js");



const generateAccessAndrefreshToken = async(userId) =>{
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})

    return{accessToken, refreshToken}
}

const registerUser = asyncHandler(async(req, res) =>{
    const {fullName, emil, password, userName} = req.body
    if(!fullName || !emil || !password || !userName){
        throw new apiError(400, "All fields are required")
    }
    const checkExistingUser = await User.findOne({$or [{userName}, {emil}]});
    if(checkExistingUser){
        throw new apiError(409, "User already exist")
    }
    const profileLocalPath = req.files?.profile[0]?.path 
    if(!profileLocalPath){
        throw new apiError(409, "Profile path is required")
    }

    const profile = await uploadImgToCloudnary(profileLocalPath)
    if(!profile){
        throw new apiError(409, "Profile file is required")
    }

    const user = await User.create({
        fullName,
        email,
        profile: profile.url,
        profilePublicId: profile.public_id,
        userName,
        password 
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new apiError(400, "Something went wrong, try again later")
    }

    return res.status(200).json(new apiResponse(200, createdUser, "User registered sucessfully"))

})

const loginUser = asyncHandler(async(req, res) =>{
    const {userName, email, password} = req.body
    if(!userName && !email){
        throw new apiError(400, "Username and email is required")
    }
    const user = await User.findOne({$or: [{userName}, {email}]})
    if(!user){
        throw new apiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new apiError(400, "Password is incorrect")
    }

    const {accessToken, refreshToken} = await generateAccessAndrefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password, -refreshToken")
    const option = {
        httpOnly : true,
        secure: true
    }

    return res.status(200).cookie("refreshToken", refreshToken, option).cookie("accessToken", accessToken, option).json(new apiResponse(200, {use: loggedInUser, accessToken, refreshToken}, "Login successfull"))
    
})

const logoutUser = asyncHandler(async(req, res) =>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {refreshToken: undefined}
        },
        {new: true}

    )

    const option ={
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("accessToken", option).clearCookie("refreshToken", option).json(new apiResponse(200, "", "User loggedout successfull!"))
})

const refreshAccessToken = asyncHandler(async(req, res) =>{
    const receivedRefreshToken = req.cookie.refreshToken || req.body.refreshToken
    if(!receivedRefreshToken){
        throw new apiError(404, "Unauthorized request")
    }

    try{
        const decodeToken = jwt.verify(receivedRefreshToken, process.env.JWT_REFRESH_SECRET)
        const user = await User.findById(decodeToken._id)
        if(!user){
            throw new apiError(400, "Token is invalid")
        }

        if(receivedRefreshToken !== user?.refreshToken){
            throw new apiError(401, "Refresh token is invalid")

        }

        const option = {
            httpOnly: true,
            secure: true
        }

        const {accessToken, newRefreshToken} = await generateAccessAndrefreshToken(user._id)

        return res.status(200).cookie("accessToken", accessToken, option).cookie("refreshToken", newRefreshToken, option).json(new apiResponse(200, {accessToken, newRefreshToken}, "Access token is refreshed"))

    }catch(error){
        throw new apiError(500, error.message)
    }
})

const changePassword = asyncHandler(async(req, res) =>{
    const {oldPassword, newPassword, confirmPassword} = req.body
    const user = await User.findById(req.user._id)
    const checkPassword = await user.isPasswordCorrect(oldPassword)
    if(!checkPassword){
        throw new apiError(400, "Incorrect Password")

    }
    if(newPassword !== confirmPassword){
        throw new apiError(400, "New password and confrim password must be same")
    }

    user.newPassword = newPassword
    await user.save({validateBeforeSave: false})
    return res.status(200).json(new apiResponse(200, "Password changed sucessfully"))
})

const updateProfile = asyncHandler(async(req, res) =>{
    const profileLocalPath = req.file?.path
    const userId = req.user._id
    if(!profileLocalPath){
        throw new apiError(400, "Profile is required")
    }

    
})