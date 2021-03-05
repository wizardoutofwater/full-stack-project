"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class highschool extends Model {
    static associate(models) {
      highschool.hasMany(models.alumni, {
        foreignKey: "highschool_id",
      });

      highschool.hasMany(models.thread, {
        foreignKey: "highschool_id",
        onDelete: "CASCADE",
      });
    }
  }
  highschool.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "highschool",
    }
  );
  return highschool;
};
