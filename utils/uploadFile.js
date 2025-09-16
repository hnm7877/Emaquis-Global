const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

exports.uploadFile = async (file, filename) => {
  try {
    // Debug de la configuration Cloudinary
    console.log("Configuration Cloudinary:", {
      cloud_name: process.env.CLOUDNAME,
      api_key: process.env.APYKEY ? "***" : "NON DÉFINI",
      api_secret: process.env.API_SECRET ? "***" : "NON DÉFINI",
    });

    const fileNameWithoutExt =
      (file?.originalname || filename)?.replace(/\.[^/.]+$/, "") || "file";
    const uniqueFileName = `${fileNameWithoutExt}-${Date.now()}`;

    let uploadResult;

    // Si c'est un Buffer (venant de Socket.IO), on l'utilise directement
    if (Buffer.isBuffer(file)) {
      uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            public_id: `images/${uniqueFileName}`,
            resource_type: "image",
            format: "png",
            quality: "auto",
          },
          (error, result) => {
            if (error) {
              console.error("Erreur Cloudinary détaillée (stream):", error);
              reject(
                new Error(
                  `Erreur lors de l'upload sur Cloudinary: ${error.message}`
                )
              );
            }
            resolve(result);
          }
        );
        uploadStream.end(file);
      });
    } else if (file.path) {
      // Si c'est un fichier avec un chemin (multer diskStorage)
      uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          file.path,
          {
            public_id: `images/${uniqueFileName}`,
            resource_type: "image",
            format: "png",
            quality: "auto",
          },
          (error, result) => {
            if (error) {
              console.error("Erreur Cloudinary détaillée (upload):", error);
              reject(
                new Error(
                  `Erreur lors de l'upload sur Cloudinary: ${error.message}`
                )
              );
            }
            resolve(result);
          }
        );
      });
    } else {
      // Si c'est un objet avec buffer (multer memoryStorage)
      uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            public_id: `images/${uniqueFileName}`,
            resource_type: "image",
            format: "png",
            quality: "auto",
          },
          (error, result) => {
            if (error) {
              console.error("Erreur Cloudinary détaillée (stream):", error);
              reject(
                new Error(
                  `Erreur lors de l'upload sur Cloudinary: ${error.message}`
                )
              );
            }
            resolve(result);
          }
        );
        // Convertir ArrayBuffer en Buffer si nécessaire
        const buffer = file.buffer
          ? Buffer.from(file.buffer)
          : Buffer.from(file);
        uploadStream.end(buffer);
      });
    }

    return {
      Location: uploadResult.secure_url,
      ETag: uploadResult.etag,
      key: uploadResult.public_id,
    };
  } catch (error) {
    console.error("Erreur lors de l'upload du fichier sur Cloudinary:", error);
    throw error;
  }
};
