'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vendor.hasMany(models.Dish)
    }
  };
  Vendor.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 127],
        msg: "Restaurant name should be less than 128 characters"
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tags: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Vendor',
  });
  return Vendor;
};