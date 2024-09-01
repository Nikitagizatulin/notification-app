'use strict';
const bcrypt = require('bcrypt');

const { Model } = require('sequelize');

function hashPassword(user, options) {
  const SALT_FACTOR = 8;
  if (!user.changed('password')) {
    return;
  }
  return bcrypt
    .genSalt(SALT_FACTOR)
    .then((salt) => bcrypt.hash(user.password, salt, null))
    .then((hash) => {
      user.setDataValue('password', hash);
    });
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    comparePassword(pwd) {
      return bcrypt.compare(pwd, this.password);
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Notification }) {
        User.hasOne(Notification,{
            foreignKey: 'user_id',
            as:'notification'
        })
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      hooks: { beforeCreate: hashPassword, beforeUpdate: hashPassword },
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );
  return User;
};
