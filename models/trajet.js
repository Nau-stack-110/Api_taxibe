'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trajet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    place_dispo: DataTypes.JSON, defaultValue:[
      'a1', 'a2', 'a3', 'a4', 'a5',
      'b1', 'b2', 'b3', 'b4', 'b5',
      'c1', 'c2', 'c3', 'c4', 'c5',
      'd1', 'd2', 'd3', 'd4', 'd5',
    ],
  }, {
    sequelize,
    modelName: 'Trajet',
  });
  return Trajet;
};