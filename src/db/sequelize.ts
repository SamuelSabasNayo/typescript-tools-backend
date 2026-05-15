import { Sequelize } from "sequelize-typescript";
import { Options } from "sequelize";
import config from "../config";

const sequelize = new Sequelize({
    ...(config.db as Options),
    logging: config.env === "development" ? console.log : false,
    models: [__dirname + "/../models"],
});

export default sequelize;