'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alumni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      alumni.belongsTo(models.highschool, {
        foreignKey: "HighSchool_id",
        onDelete: 'CASCADE'
      });
    }
  };
  alumni.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    graduationYear: DataTypes.INTEGER,
    HighSchool_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'alumni',
  });
  return alumni;
};