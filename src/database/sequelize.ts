import {Sequelize} from "sequelize-typescript";

// Postgres defaults to port 5432
const sequelize = new Sequelize({
    database: process.env.DB_DATABASE,
    dialect: "postgres",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    models: [__dirname + "/models"]
})

// const initDB = async () => {
//     await sequelize.authenticate()
//     await sequelize.sync({alter: true})
// }

export default sequelize;