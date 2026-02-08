const fs = require("fs");
const cloudnary = require("cloudinary").v2;

cloudnary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadImgToCloudnary = async (localFilePath) => {
  if (!localFilePath) {
    return null;
  }
  try {
    const response = await cloudnary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    return response;
  } catch (error) {
    console.log("Failed to upload", error.message);
    throw error;
  } finally {
    fs.existsSync(localFilePath) && fs.unlinkSync(localFilePath);
  }
};

const uploadVideoToCloudnary = async (localFilePath) => {
  if (!localFilePath) {
    return null;
  }
  try {
    const response = await cloudnary.uploader.upload(localFilePath, {
      resource_type: "video",
      chunk_size: 6000000, // 6mb
    });

    return response;
  } catch (error) {
    console.log("Failed to upload", error.message);
  } finally {
    fs.existsSync(localFilePath) && fs.unlinkSync(localFilePath);
  }
};

module.exports = {
  uploadImgToCloudnary,
  uploadVideoToCloudnary,
};
