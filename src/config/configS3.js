require('dotenv').config();
const aws = require('@aws-sdk/client-s3');

const awsS3Client = new aws.S3({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

console.log('AWS S3 conectado');

module.exports = { awsS3Client };
