const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Type = sequelize.define("Type", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Type;
};
