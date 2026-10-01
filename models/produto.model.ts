import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Produto = sequelize.define("Produto", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

export default Produto;