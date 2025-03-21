import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import dbConnection from "./database/sequelize";

import "./database/models/Task"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

const start = async () => {
    try {
        await dbConnection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    await dbConnection.sync({alter: true})
        .then(() => console.log('Database synced'))
        .catch((error) => console.log('Unable to connect to DB', error)); // Synchronizes the database with the defined models

    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

start();