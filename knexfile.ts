import type { Knex } from 'knex'
import 'dotenv/config';

// Update with your config settings.

 const config: Knex.Config = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/migrations',
  },    
}

module.exports = config;
