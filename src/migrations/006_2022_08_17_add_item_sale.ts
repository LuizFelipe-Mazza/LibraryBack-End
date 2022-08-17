import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('items_sale', function (table) {
    table.increments('id').primary()
    table.integer('id_sale').unsigned()
    table.integer('id_book').unsigned()
    table.string('price', 30).notNullable()
    table.foreign('id_sale').references('id').inTable('sale')
    table.foreign('id_book').references('product_code').inTable('book')
  })
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('items_sale')
}
