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
          key:'id',
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      route_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Routes',
          key:'id',
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      time: {
        type: Sequelize.TIME,
        allowNull:false
      },
      place_dispo: {
        type: Sequelize.JSON,
        allowNull:false,
        defaultValue:[
          'a1', 'a2', 'a3', 'a4', 'a5',
          'b1', 'b2', 'b3', 'b4', 'b5',
          'c1', 'c2', 'c3', 'c4', 'c5',
          'd1', 'd2', 'd3', 'd4', 'd5',
        ],
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