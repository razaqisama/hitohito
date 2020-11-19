'use strict';
const {
  Model
} = require('sequelize');

const encrypt = require('../helpers/encryptPWD');

module.exports = (sequelize, DataTypes) => {
  class Hirer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hirer.hasMany(models.Request);
    }
  };
  Hirer.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options){
        const hash = encrypt.encryptPWD(instance.password);
        instance.password = hash;
      }
    },
    sequelize,
    modelName: 'Hirer',
  });
  return Hirer;
};