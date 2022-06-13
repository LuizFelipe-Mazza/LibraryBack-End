import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('provider', function (table) {
    table.increments('id').primary()
    table.integer('id_address').unsigned()
    table.string('name', 50).notNullable()
    table.string('name_fant', 80).notNullable()
    table.string('cnpj', 14).notNullable()
    table.string('phone_number', 11).notNullable()
    table.string('cel', 11).notNullable()
    table.string('email', 50).notNullable()
    table.foreign('id_address').references('id').inTable('address')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('provider')
}
