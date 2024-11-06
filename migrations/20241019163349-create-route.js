'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      depart_city: {
        type: Sequelize.STRING,
        allowNull:false
      },
      arrival_city: {
        type: Sequelize.STRING,
        allowNull:false
      },
      date_depart: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      time_travel: {
        type: Sequelize.TIME,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Routes');
  }
};