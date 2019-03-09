import Knex from "knex";
import dbConfig from "../../knexfile";

const env = process.env.NODE_ENV;

const dbSettings = dbConfig[env];

export default Knex(dbSettings);
