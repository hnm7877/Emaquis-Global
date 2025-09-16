const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APYKEY,
  api_secret: process.env.API_SECRET
});

module.exports = cloudinary;