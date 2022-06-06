import knex from "knex";
import * as config  from "../knexfile";
const db = knex(config);

export default db;