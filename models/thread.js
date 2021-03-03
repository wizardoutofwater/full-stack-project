'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      thread.belongsTo(models.highschool, {
        foreignKey: "highschool_id",
        onDelete: 'CASCADE'
      });

      thread.belongsTo(models.user, {
        foreignKey: "user_id"
      });

    thread.hasMany(models.comment, {
      foreignKey: 'thread_id'
    });
    };
  };
  thread.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'thread',
  });
  return thread;
};