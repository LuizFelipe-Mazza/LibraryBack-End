import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('address', function (table) {
      table.increments('id').primary()
        table.string('city', 30).notNullable()
        table.string('comp', 30).nullable()
        table.string('zip_code', 30).notNullable()
        table.string('street', 30).notNullable()
        table.string('number', 30).notNullable()
        table.string('state', 2).notNullable()
    })

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('address')
}
