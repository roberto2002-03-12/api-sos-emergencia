require('dotenv').config();
const { awsS3Client } = require('../config/configS3');

const deleteObjectsFromAWS = async (arrayOfKeys) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Delete: {
        Objects: [],
      },
    };

    for (let i = 0; i < arrayOfKeys.length; i += 1) {
      params.Delete.Objects.push({ Key: arrayOfKeys[i] });
    }
    await awsS3Client.deleteObjects(params);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { deleteObjectsFromAWS };
