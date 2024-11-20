'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookng_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Bookings',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull:false
      },
      payment_method: {
        type: Sequelize.ENUM('credit_card','cash','mobile_money'),
        allowNull:false
      },
      payment_date: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
      },
      status: {
        type: Sequelize.ENUM('pending','completed','refund','failed'),
        allowNull:false,
        defaultValue:'pending'
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
    await queryInterface.dropTable('Payments');
  }
};