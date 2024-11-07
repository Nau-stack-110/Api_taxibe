'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
  
    static associate(models) {
      Route.hasMany(models.Bookings, {foreignKey:'route_id'});
    }
  }
  Route.init({
    depart_city: DataTypes.STRING,
    arrival_city: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};