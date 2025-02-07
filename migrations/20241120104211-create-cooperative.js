'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cooperatives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:'Users',
          key:'id',
        },
        onUpdate: 'CASCADE',
        onDelete :'SET NULL',
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      adresse: {
        type: Sequelize.JSON,
        allowNull:false
      },
      contact: {
        type: Sequelize.STRING,
        allowNull:false
      },
      bio: {
        type: Sequelize.STRING,
        allowNull:true
      },
      link_web: {
        type: Sequelize.STRING,
        allowNull:true
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
    await queryInterface.dropTable('Cooperatives');
  }
};