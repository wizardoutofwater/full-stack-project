'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alumni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Alumni.belongsTo(models.highschool, {
        foreignKey: "HighSchool_id",
        onDelete: 'CASCADE'
      });
    }
  };
  Alumni.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    graduationYear: DataTypes.INTEGER,
    HighSchool_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Alumni',
  });
  return Alumni;
};