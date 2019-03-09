// Update with your config settings.
const dotenv = require("dotenv");
dotenv.config();

const { TEST_DB, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

module.exports = {
  test: {
    client: "postgresql",
    connection: {
      database: TEST_DB,
      user: DB_USER,
      password: DB_PASSWORD
    },
    useNullAsDefault: true
  },

  development: {
    client: "postgresql",
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
