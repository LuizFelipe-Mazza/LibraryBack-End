import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('editora', function (table) {
    table.increments('id').primary()
    table.string('nome',50).notNullable()
    table.string('telefone',12).unique().notNullable()
    table.string('rua',255).notNullable()
    table.string('numero',255).unique().notNullable()
    table.string('bairro',255).notNullable()
    table.string('cidade',255).notNullable()
    table.string('estado',255).notNullable()
    table.string('site',255).unique().notNullable()

  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('editora')
}