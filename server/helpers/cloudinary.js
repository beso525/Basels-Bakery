const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name : 'dnaf1vnwt',
  api_key: '442472316635266',
  api_secret: 'unxMH-unvNrvxJyIU23pQ0LEUIA',
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type : 'auto',
  })

  return result;
} 

const upload = multer({storage});

module.exports = {upload, imageUploadUtil};