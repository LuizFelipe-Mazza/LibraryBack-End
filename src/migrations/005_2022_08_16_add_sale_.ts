import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('sale', function (table) {
    table.increments('id').primary()
    table.integer('id_user').unsigned()
    table.integer('id_address').unsigned()
    table.string('total_sale', 30).notNullable()
    table.string('payment_type', 30).nullable()
    table.foreign('id_address').references('id').inTable('address')
    table.foreign('id_user').references('id').inTable('user')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('sale')
}
