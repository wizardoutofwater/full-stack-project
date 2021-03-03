"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class alumni extends Model {
    static associate(models) {
      alumni.belongsTo(models.highschool, {
        foreignKey: "HighSchool_id",
        onDelete: "CASCADE",
      });
      alumni.belongsTo(models.user, {
        foreignKey: "user_id",
      });
    }
  }
  alumni.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      graduationYear: DataTypes.INTEGER,
      HighSchool_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "alumni",
    }
  );
  return alumni;
};
