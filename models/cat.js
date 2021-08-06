'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.Comments = this.hasMany(models.Comment, { onDelete: 'cascade' })
      this.Owner = this.belongsTo(models.Owner)
    }
  };
  Cat.init({
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    OwnerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cat',
  });
  return Cat;
};
