'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Users',
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
      taxibe_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Taxibes',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      nb_mpandeha: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      status: {
        type: Sequelize.ENUM('pending','cancel','booked','completed'),
        allowNull:false,
        defaultValue:'pending'
      },
      date_booking: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable('Bookings');
  }
};