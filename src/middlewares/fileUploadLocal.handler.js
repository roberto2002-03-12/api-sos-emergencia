// this can be used for testing, or if you don't want s3
const multer = require('multer');

const storageImages = multer.diskStorage({
  destination: (req, file, cb) => {
    // if (!file) return;
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    // if (!file) return;
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storageImages,
});

module.exports = upload;
