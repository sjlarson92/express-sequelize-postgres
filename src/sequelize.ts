import {Sequelize} from "sequelize-typescript";

const dbConnection = new Sequelize('sequelize_db', 'express_user', 'express_password', {
    dialect: "postgres",
    host: "localhost",
    models: [__dirname + '/**/*.model.ts']
})

export default dbConnection;