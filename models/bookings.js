'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
   
    static associate(models) {
      Bookings.belongsTo(models.User, {foreignKey:'user_id'});
      Bookings.belongsTo(models.Trajet, {foreignKey:'trajet_id'});
    }
  }
  Bookings.init({
    user_id: DataTypes.INTEGER,
    trajet_id: DataTypes.INTEGER,
    nb_mpandeha: {
      type: DataTypes.VIRTUAL,
      get() {
        const seats = this.getDataValue('seat_researved');
        return Array.isArray(seats) ? seats.length : 0;
      },
      set(value) {
        throw new Error('nb_mpandeha est un champ calculé automatiquement.');
      }
    },
    seat_researved: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },
    date_booking: DataTypes.DATE,
    ticketCode:DataTypes.STRING,
    is_booked:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Bookings',
  });
  return Bookings;
};