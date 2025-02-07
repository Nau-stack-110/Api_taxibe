'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaxiBe extends Model {

    static associate(models) {
      TaxiBe.hasMany(models.Trajet, {foreignKey:'taxibe_id'});
      TaxiBe.belongsTo(models.Cooperative, {foreignKey:'cooperative_id'});
    }
  }
  TaxiBe.init({
    type: DataTypes.STRING,
    cooperative_id: DataTypes.INTEGER,
    imageTaxi: DataTypes.STRING,
    matricule: DataTypes.STRING,
    category: DataTypes.STRING,
    nb_total_place: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TaxiBe',
  });
  return TaxiBe;
};