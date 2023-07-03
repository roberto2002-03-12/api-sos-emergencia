const { NOTIFICATION_TABLE, NotificationSchema } = require('../models/notification.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(NOTIFICATION_TABLE, NotificationSchema);
  },
};
