const fs = require("fs");
const cloudnary = require("cloudinary").v2

cloudnary.config({
    cloud_name : process.env.dowgd5qx1,
    api_key: 396565776491615,
    api_secret : YJAOXL-XAa1hovDk7TRXF_6E1-Q,
    secure: true

})

const uploadImgToCloudnary = async(localFilePath) =>{
    if(!localFilePath){
        return null
    }
    try{
        const response = await cloudnary.uploader.upload(localFilePath, {
            resource_type: "image"
        })
    }catch(error){
        console.log("Failed to upload", error.message)
        throw error
    }finally{
        fs.existsSync(localFilePath) && fs.unlinkSync(localFilePath)
    }
}

const uploadVideoToCloudnary = async(localFilePath) =>{
    if(!localFilePath){
        return null
    }
    try{
        const response = await cloudnary.uploader.upload(localFilePath, {
            resource_type: "video"

        })
    }catch(error){
        console.log("Failed to upload", error.message)
    }finally{
        fs.existsSync(localFilePath) && fs.unlinkSync(localFilePath)
    }

}


module.exports = {
    uploadImgToCloudnary,
    uploadVideoToCloudnary
}