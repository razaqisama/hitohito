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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Username tidak boleh null say'
        },
        notEmpty: {
          msg: 'Username tidak boleh kosong say'
        }
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Name Tidak Boleh Null Say'
        },
        notEmpty: {
          msg: 'Name Tidak Boleh Kosong Say'
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Age Tidak Boleh Null Say'
        },
        notEmpty: {
          msg: 'Age Tidak Boleh Kosong Say'
        },
        isNumeric: {
          msg: 'Agenya harus angka ya, say'
        }
      }},
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Gender Tidak Boleh Null Say'
        },
        notEmpty: {
          msg: 'Gender Tidak Boleh Kosong Say'
        },
        isActuallyGender(value){
          if(value !== 'male' || value !== 'female'){
            throw new Error('Gender harus male or female say')
          }
        }
      }}
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