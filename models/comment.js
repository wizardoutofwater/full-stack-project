'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comment.belongsTo(models.thread, {
        foreignKey: "thread_id",
        onDelete: 'CASCADE'
      });
      comment.belongsTo(models.user, {
        foreignKey: "user_id"
      })
    }
  };
  comment.init({
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};