import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "aprendizado_backend",
    "root",
    "12345678",
    {
        host: "localhost",
        dialect: "mysql",
        logging: false
    }
);

export default sequelize;