'use strict';

const Pokemon = (DB, Sequelize) =>
  DB.define('pokemon', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: {
          msg: "A Pokemon's price must be a valid number",
        },
      },
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isInt: {
          msg: "A Pokemon's stock must be a valid number",
        },
        min: 0,
      },
    },
  });


module.exports = Pokemon;
