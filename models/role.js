'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {foreignKey:'role_id'});
    }
  }
  Role.init({
    rolename: DataTypes.ENUM('Admin','User','AdminCoop'),
    roledesc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};