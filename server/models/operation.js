module.exports = (sequelize, type) => {
  const operationModel = sequelize.define(
    "operation",
    {
      id: {
        type: type.SMALLINT(),
        primaryKey: true,
        autoIncrement: true,
      },
      concept: {
        type: type.STRING(90),
        allowNull: false,
      },
      amount: {
        type: type.REAL(),
        allowNull: false,
      },
      type: {
        type: type.STRING(8),
        allowNull: false,
      },
      date: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      createdat: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedat: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return operationModel;
};
