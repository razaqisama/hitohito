'use strict';
const {
  Model
} = require('sequelize');

const encrypt = require('../helpers/encryptPWD');
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Actor.hasMany(models.Request);
    }
  };
  Actor.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    displayName: DataTypes.STRING,
    reputation: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate(instance, options){
        const hash = encrypt.encryptPWD(instance.password);
        instance.password = hash;
      }
    },
    sequelize,
    modelName: 'Actor',
  });
  return Actor;
};