const sequelize = require('../database');
const DataTypes = require('sequelize');

var Computer = sequelize.define('Computer', {
    // Model attributes are defined here
    Company: {
        type: DataTypes.STRING,
    },
    Product: {
        type: DataTypes.STRING
    },
    Type: {
        type: DataTypes.STRING
    },
    Inches: {
        type: DataTypes.DOUBLE
    },
    Resolution: {
        type: DataTypes.STRING
    },
    CPU: {
        type: DataTypes.STRING
    },
    RAM: {
        type: DataTypes.STRING
    },
    Memory: {
        type: DataTypes.STRING
    },
    Graphics: {
        type: DataTypes.STRING
    },
    OpSys: {
        type: DataTypes.STRING
    },
    Weight: {
        type: DataTypes.INTEGER
    },
    Price: {
        type: DataTypes.DOUBLE
    },
});

module.exports = Computer;