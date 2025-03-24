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
import {Table, Model, Column} from 'sequelize-typescript';

/**
 * overwrite default plural table name and
 * stop auto generation of createdAt and updatedAt fields
 */
@Table({tableName: 'task', timestamps: false})
class Task extends Model {

   // By default, sequelize adds id to the model. See extended Model above

   @Column
    declare name: string;

   // Column names are not auto translated in regard to camel case
   @Column({field: 'is_completed'})
    declare isCompleted: boolean;
}

export default Task;

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

## Add Atlas (migration tool)

1. Install Atlas with Brew `brew install ariga/tap/atlas`
2. Install provider `npm install @ariga/atlas-provider-sequelize`
3. Set up atlas.chl file in project directory
    ```bash
    data "external_schema" "sequelize" {
        program = [
            "npx",
            "@ariga/ts-atlas-provider-sequelize",
            "load",
            "--path", "./src/models", // Adjust this to the directory containing your models
            "--dialect", "postgres", // Adjust to db type
        ]
    }
    
    env "sequelize" {
        src = data.external_schema.sequelize.url
        // dev db must be different from url db so that it can be used to compare for migrations
        dev = "postgres://sashalarson:password@localhost:5432/sequelize_db_dev?sslmode=disable" 
        url = "postgres://sashalarson:password@localhost:5432/sequelize_db?sslmode=disable"
        // Add migration directory configuration
        migration {
            dir = "file://migrations"
        }
        format {
            migrate {
                diff = "{{ sql . \"  \" }}"
            }
        }
    }
    ```

4. Generate migration file to migrations directory `atlas migrate diff file_name --env sequelize`
5. Run migrations ` atlas migrate apply --env sequelize`






