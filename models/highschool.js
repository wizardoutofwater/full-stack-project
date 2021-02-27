'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HighSchool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HighSchool.associate = function(models) {
        HighSchool.hasMany(models.alumni, {
          foreignKey: 'HighSchool_id'
        });
      }
    }
  };
  HighSchool.init({
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'highschool',
  });
  return HighSchool;
};