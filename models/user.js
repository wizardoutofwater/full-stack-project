"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
  
    static associate(models) {
      user.hasMany(models.comment, {
        foreignKey: "user_id",
      });
      user.hasMany(models.thread, {
        foreignKey: "user_id",
      });
      user.hasOne(models.alumni, {
        foreignKey: "user_id",
      });
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
