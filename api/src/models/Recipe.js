const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Imagen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      SumamaryOfTheDish: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      HealthyFoodLevel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      StepByStep: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  ); // <- Esta opción evita que se agreguen campos `createdAt` y `updatedAt`
};
