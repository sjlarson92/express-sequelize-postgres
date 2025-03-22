import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import dbConnection from "../sequelize";

import "./models/Task.model"
import taskRouter from "./TaskRoute";

dotenv.config();

const app: Express = express();
const port = 3000;

/**
 * built in middleware to handle json data. This is needed to read json
 */
app.use(express.json())

app.use('/api/tasks', taskRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

const start = async () => {
    try {
        await dbConnection.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

start();