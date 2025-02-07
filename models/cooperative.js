'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cooperative extends Model {
    static associate(models) {
      Cooperative.hasMany(models.TaxiBe, {foreignKey:'cooperative_id'});
      Cooperative.belongsTo(models.User, {foreignKey:'admin'});
    }
  }
  Cooperative.init({
    admin: DataTypes.INTEGER,
    name: DataTypes.STRING,
    adresse: {
      type: DataTypes.JSON,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('adresse');
        return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
      },
    },
    bio: DataTypes.STRING,
    contact: DataTypes.STRING,
    link_web: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cooperative',
  });
  return Cooperative;
};