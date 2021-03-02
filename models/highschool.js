'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class highschool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      highschool.associate = function(models) {
        highschool.hasMany(models.alumni, {
          foreignKey: 'HighSchool_id'
        });
      }
    }
  };
  highschool.init({
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'highschool',
  });
  return highschool;
};