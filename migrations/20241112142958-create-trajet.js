'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trajets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taxibe_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'TaxiBes',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      route_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Routes',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull:false,
      },
      time: {
        type: Sequelize.TIME,
        allowNull:false
      },
      place_dispo: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Trajets');
  }
};