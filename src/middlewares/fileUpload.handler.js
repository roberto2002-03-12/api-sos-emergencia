require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { awsS3Client } = require('../config/configS3');

const upload = multer({
  storage: multerS3({
    bucket: process.env.AWS_BUCKET_NAME,
    s3: awsS3Client,
    acl: 'public-read',
    key: (req, file, cb) => {
      if (!file) return;
      cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    },
  }),
});

module.exports = upload;
