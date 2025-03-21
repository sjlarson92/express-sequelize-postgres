# express-sequelize-postgres
Express node app using Sequelize ORM and PostgreSQL

## Add Sequelize

- Install Sequelize
`npm i sequelize`

- Install driver for database of choice, below is Postgres
`npm i pg pg-hstore`

- Create `sequelize.ts` file in root of project and initialize Sequelize instance
`const sequelize = new Sequelize('postgres://user:password@localhost:PORT/db')`

- Create model for tables

- By default, when the table name is not given, Sequelize automatically pluralizes the model name and uses that as the table name. 
  - This can be configured specifically per table or globally to match the model by changing instance of Sequelize:
```ts
const sequelize = new Sequelize('DATABASE_URL', {
  define: {
    freezeTableName: true,
  },
});
```