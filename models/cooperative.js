'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cooperative extends Model {
    static associate(models) {
      Cooperative.hasMany(models.TaxiBe, {foreignKey:'cooperative_id'});
    }
  }
  Cooperative.init({
    name: DataTypes.STRING,
    adresse: DataTypes.STRING,
    bio: DataTypes.STRING,
    contact: DataTypes.INTEGER,
    link_web: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cooperative',
  });
  return Cooperative;
};