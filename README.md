# express-sequelize-postgres
Express node app using Sequelize ORM and PostgreSQL

## Add Sequelize

- Install Sequelize
`npm i sequelize`

- Install driver for database of choice, below is Postgres
`npm i pg pg-hstore`

- Create `sequelize.ts` file in root of project and initialize Sequelize instance
```ts
const dbConnection = new Sequelize(DB, DB_USER, DB_USER, {
  dialect: "postgres",
  host: DB_HOST,
})

export default dbConnection;
```

- Create model for tables
```ts
import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes} from "sequelize";
import dbConnection from "../dbConnectionFile";

class TaskModel extends Model<InferAttributes<TaskModel>, InferCreationAttributes<TaskModel>> {
    // declare needed for typesecript so field is not ignored in type
    declare id: CreationOptional<number>;
    declare name: string;
    declare isCompleted: boolean;
}

TaskModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        /*
          By default Sequelize automatically pluralizes the model name and uses that as the table name. 
          This can be configured specifically per table or globally
         */
        tableName: 'task',
        sequelize: dbConnection
    }
)

export default TaskModel;
```

- Import models in index.ts and call sync in start() this will generate and alter tables to match models
- Add `app.use(express.json())` to ensure app can read json data

```ts
import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import dbConnection from "./database/sequelize";

import "./database/models/TaskModel"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

/**
 * built in middleware to handle json data. This is needed to read json
 */
app.use(express.json())

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

    await dbConnection.sync({alter: true}) // we don't want to be syncing data when running app. use migrations instead
        .then(() => console.log('Database synced'))
        .catch((error) => console.log('Unable to connect to DB', error)); // Synchronizes the database with the defined models

    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

start();
```

