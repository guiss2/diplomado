import { Sequelize } from "sequelize";
import config from "../config/env.js";


 export const sequelize = new Sequelize(
//nombre de la base de datos
config.DB_DATABASE,
config.DB_USER,
config.DB_PASSWORD,
{
    host:config.DB_HOST,
    dialect: config.DB_DIALECT,
    logging: console.log()
}

)