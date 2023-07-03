require('dotenv').config();
// FB = FireBase
const config = {
  port: process.env.PORT || 3001,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.JWT_SECRET,
  emailRecype: process.env.EMAIL_RECYPE,
  passRecype: process.env.PASS_RECYPE,
  apiKeyFB: process.env.API_KEY_FB,
  authDomainFB: process.env.AUTH_DOMAIN_FB,
  projectIdFB: process.env.PROJECT_ID_FB,
  storageBucketFB: process.env.STORAGE_BUCKET_FB,
  messagingSenderIdFb: process.env.MSG_SENDER_ID_FB,
  appIdFB: process.env.APP_ID_FB,
};

module.exports = { config };
