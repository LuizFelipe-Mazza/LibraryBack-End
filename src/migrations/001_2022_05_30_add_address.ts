import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('address', function (table) {
      table.increments('id_address').primary(),
        table.string('city', 30).notNullable(),
        table.string('comp', 30).nullable(),
        table.string('zip_code', 30).notNullable(),
        table.string('street', 30).notNullable(),
        table.string('number', 30).notNullable(),
        table.string('state', 2).notNullable()
    })
    .createTable('provider', function (table) {
      table.increments('id').primary(),
        table.foreign('id_address').references('address'),
        table.string('name', 50).notNullable(),
        table.string('name_fant', 80).notNullable(),
        table.string('cnpj', 14).notNullable(),
        table.string('phone_number', 11).notNullable(),
        table.string('email', 50).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
 await knex.schema.dropTable('provider');
 await  knex.schema.dropTable('address');

}
