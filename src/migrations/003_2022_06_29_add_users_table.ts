import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', function (table) {
    table.increments('id').primary()
    table.integer('id_persona').unsigned()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.boolean('active').defaultTo(0)
    table.string('avatar').nullable()
    table.string('hash_recovery_password', 16).notNullable()
    table
      .datetime('date_agree_use_terms', { precision: 2 })
      .defaultTo(knex.fn.now(6))
    table.string('token_google').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user')
}
