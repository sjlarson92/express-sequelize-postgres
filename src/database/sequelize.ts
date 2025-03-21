import {Sequelize} from "sequelize";

const dbConnection = new Sequelize('sequelize_db', 'express_user', 'express_password', {
    dialect: "postgres",
    host: "localhost",
})

export default dbConnection;