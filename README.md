## Nodejs Sequelize RESTAPI PostgreSQL

This is a simple REST API using Javascript Technologies and PostgreSQL.

- nodejs
- express
- postgreSQL
- sequelize

## Modeling

This is the basic relationship that we are using in this example

![](./docs/diagram.png)

## Program Structure

```bash
.
├── package.json
├── requests
│   ├── programs.http
│   └── tasks.http
├── sql
│   └── db.sql
└── src
    ├── app.js
    ├── controllers
    │   ├── program.controller.js
    │   └── task.controller.js
    ├── database
    │   └── database.js
    ├── index.js
    ├── models
    │   ├── Program.js
    │   └── Task.js
    └── routes
        ├── programs.routes.js
        └── tasks.routes.js

7 directories, 15 files
```
