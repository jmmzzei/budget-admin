module.exports = (sequelize, type) => {
  const operationModel = sequelize.define(
    'operation',
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
        type: type.DATEONLY,
        defaultValue: new Date(),
        allowNull: false,
      },
      createdat: {
        type: type.DATEONLY,
        defaultValue: new Date(),
        allowNull: false,
      },
      updatedat: {
        type: type.DATEONLY,
        defaultValue: new Date(),
        allowNull: false,
      },
    },
    { timestamps: false },
  )
  return operationModel
}
