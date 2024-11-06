'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaxiBe extends Model {
 
    static associate(models) {
      TaxiBe.hasMany(models.Bookings, {foreignKey:'taxibe_id'});
    }
  }
  TaxiBe.init({
    type: DataTypes.STRING,
    imageTaxi: DataTypes.STRING,
    matricule: DataTypes.INTEGER,
    category: DataTypes.STRING,
    nb_total_place: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TaxiBe',
  });
  return TaxiBe;
};