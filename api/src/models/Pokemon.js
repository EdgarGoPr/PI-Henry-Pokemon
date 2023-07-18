const { DataTypes } = require("sequelize");

// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a Sequelize.
module.exports = (sequelize) => {
  // Definimos el modelo
  const Pokemon = sequelize.define("Pokemon", {
    id: {
      type: DataTypes.UUID, // Tipo de dato: UUID (identificador único universal)
      defaultValue: DataTypes.UUIDV4, // Valor predeterminado: Genera un UUID único para cada registro
      primaryKey: true, // Clave primaria
    },
    name: {
      type: DataTypes.STRING, // Tipo de dato: Cadena de texto
      allowNull: false, // No puede ser nulo
    },
    image: {
      type: DataTypes.STRING, // Tipo de dato: Cadena de texto
      allowNull: false, // No puede ser nulo
    },
    life: {
      type: DataTypes.INTEGER, // Tipo de dato: Número entero
      allowNull: false, // No puede ser nulo
    },
    attack: {
      type: DataTypes.INTEGER, // Tipo de dato: Número entero
      allowNull: false, // No puede ser nulo
    },
    defense: {
      type: DataTypes.INTEGER, // Tipo de dato: Número entero
      allowNull: false, // No puede ser nulo
    },
    speed: {
      type: DataTypes.INTEGER, // Tipo de dato: Número entero
      allowNull: true, // Puede ser nulo
    },
    height: {
      type: DataTypes.FLOAT, // Tipo de dato: Número de punto flotante
      allowNull: true, // Puede ser nulo
    },
    weight: {
      type: DataTypes.FLOAT, // Tipo de dato: Número de punto flotante
      allowNull: true, // Puede ser nulo
    },
  });

  return Pokemon;
};
