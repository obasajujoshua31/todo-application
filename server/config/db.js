import Knex from "knex";
import dbConfig from "../../knexfile";

const { NODE_ENV, secret, REDIS_PORT } = process.env;
export { secret, REDIS_PORT };

const dbSettings = dbConfig[NODE_ENV];
export default Knex(dbSettings);
