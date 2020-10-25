const { Sequelize, DataTypes } = require("sequelize");
const operationModel = require("./operation");

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  }
);
const operation = operationModel(sequelize, DataTypes);

module.exports = { sequelize, operation };
