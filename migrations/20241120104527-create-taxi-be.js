'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaxiBes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        allowNull:false
      },
      cooperative_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Cooperatives',
          key:'id',
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      imageTaxi: {
        type: Sequelize.STRING,
        allowNull:true
      },
      matricule: {
        type: Sequelize.STRING,
        allowNull:false
      },
      category: {
        type: Sequelize.STRING,
        allowNull:false
      },
      nb_total_place: {
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
    await queryInterface.dropTable('TaxiBes');
  }
};