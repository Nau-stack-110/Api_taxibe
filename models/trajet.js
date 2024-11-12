'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trajet extends Model {
    static associate(models) {
      Trajet.belongsTo(models.TaxiBe, {foreignKey:'taxibe_id'});
      Trajet.belongsTo(models.Route, {foreignKey:'route_id'});
    }
  }
  Trajet.init({
    taxibe_id: DataTypes.INTEGER,
    route_id: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    place_dispo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trajet',
  });
  return Trajet;
};