const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

exports.uploadFile = async (file, filename) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_BUCKET_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_KEY;

  const s3 = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  // uploads a file to AWS Cloud s3
  const fileStream = file.path ? fs.createReadStream(file.path) : file;

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file?.originalname || filename,
    acl: 'public-read',
  };

  const command = new PutObjectCommand(uploadParams);
  return await s3.send(command);
};
