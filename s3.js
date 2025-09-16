require('dotenv').config()
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner') // utile si tu veux générer des URL signées

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

// Initialisation du client S3
const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

// Upload d’un fichier vers S3
async function uploadFile(file) {
  const uploadParams = {
    Bucket: bucketName,
    Key: file.name,
    Body: file.data
  }

  const command = new PutObjectCommand(uploadParams)
  return await s3.send(command)
}
exports.uploadFile = uploadFile

// Télécharger un fichier depuis S3 (retourne un stream)
async function getFileStream(fileKey) {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey
  }

  const command = new GetObjectCommand(downloadParams)
  const response = await s3.send(command)
  return response.Body // c’est un ReadableStream
}
exports.getFileStream = getFileStream
