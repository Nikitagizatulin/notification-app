'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({User}) {
            Notification.belongsTo(User,{
                foreignKey: "user_id",
                as: 'user'
            })
        }
    }
    Notification.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            search_query: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            interval: {
                allowNull: false,
                type: DataTypes.ENUM('hourly', 'daily', 'weekly'),
            },
            days:{
                allowNull: true,
                type: DataTypes.JSON,
                get() {
                    return this.getDataValue('days').split(',');
                },
                set(value) {
                    this.setDataValue('daysField', value.join(',')); // for CSV
                },
            },
            time:{
                allowNull: true,
                type: DataTypes.TIME
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            sent_at:{
                allowNull: false,
                type: DataTypes.DATE,
            }
        },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            sequelize,
            tableName: 'notifications',
            modelName: 'Notification',
        }
    );
    return Notification;
};
