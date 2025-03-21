import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import dbConnection from "./database/sequelize";

import "./database/models/Task"
import taskRouter from "./TaskRoute";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/api/tasks', taskRouter)

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

    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

start();