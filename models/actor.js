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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Username Tidak Boleh Null Say'
        },
        notEmpty: {
          msg: 'Username Tidak Boleh Kosong Say'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Password Tidak Boleh Null Say'
        },
        notEmpty: {
          msg: 'Password Tidak Boleh Kosong Say'
        }
      }
    },
    displayName: DataTypes.STRING,
    reputation: DataTypes.DOUBLE,
    jobsDone: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate(instance, options){
        const hash = encrypt.encryptPWD(instance.password);
        instance.password = hash;
        if(!instance.displayName || instance.displayName.trim() === ''){
          instance.displayName = 'Jokerisasi Klinis'
        }
        instance.reputation = 0;
      }
    },
    sequelize,
    modelName: 'Actor',
  });
  return Actor;
};