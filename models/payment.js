'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {

    static associate(models) {
      Payment.belongsTo(models.Bookings, {foreignKey:'booking_id'});
    }
  }
  Payment.init({
    booking_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL(10, 2),
    payment_method: DataTypes.ENUM('credit_card','cash','mobile_money'),
    payment_date: DataTypes.DATE,
    status: DataTypes.ENUM('pending','completed','refund','failed')
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};