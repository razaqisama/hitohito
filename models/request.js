'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.belongsTo(models.Actor);
      Request.belongsTo(models.Hirer);
    }
  };
  Request.init({
    HirerId: DataTypes.INTEGER,
    ActorId: DataTypes.INTEGER,
    request: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};