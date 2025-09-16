const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

exports.uploadFile = async (file, filename) => {
  try {
    const fileNameWithoutExt = (file?.originalname || filename)?.replace(/\.[^/.]+$/, "") || 'file';
    const uniqueFileName = `${fileNameWithoutExt}-${Date.now()}`;
    
    let uploadResult;
    
    if (file.path) {
   
      uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          file.path,
          { public_id: `images/${uniqueFileName}`, resource_type: "auto" },
          (error, result) => {
            if (error) {
              reject(new Error('Erreur lors de l\'upload sur Cloudinary'));
            }
            resolve(result);
          }
        );
      });
    } else {
     
      uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { public_id: `images/${uniqueFileName}`, resource_type: "auto" },
          (error, result) => {
            if (error) {
              reject(new Error('Erreur lors de l\'upload sur Cloudinary'));
            }
            resolve(result);
          }
        );
        uploadStream.end(file.buffer || file);
      });
    }
    
   
    return {
      Location: uploadResult.secure_url,
      ETag: uploadResult.etag,
      key: uploadResult.public_id
    };
  } catch (error) {
    console.error('Erreur lors de l\'upload du fichier sur Cloudinary:', error);
    throw error;
  }
};
