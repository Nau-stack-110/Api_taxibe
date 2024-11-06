'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    static associate(models) {
      Bookings.belongsTo(models.User);
      Bookings.belongsTo(models.Route);
      Bookings.belongsTo(models.TaxiBe);
    } 
  }
  Bookings.init({
    user_id: DataTypes.INTEGER,
    route_id: DataTypes.INTEGER,
    taxibe_id: DataTypes.INTEGER,
    nb_mpandeha: DataTypes.INTEGER,
    status: DataTypes.ENUM('pending','cancel','booked','completed'),
    date_booking: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Bookings',
  });
  return Bookings;
};