"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tslib_1 = require("tslib");
function up(knex) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .createTable('address', function (table) {
            table.increments('id_address').primary(),
                table.string('city', 30).notNullable(),
                table.string('comp', 30).nullable(),
                table.string('zip_code', 30).notNullable(),
                table.string('street', 30).notNullable(),
                table.string('number', 30).notNullable(),
                table.string('state', 2).notNullable();
        })
            .createTable('provider', function (table) {
            table.increments('id').primary(),
                table.foreign('id_address').references('address'),
                table.string('name', 50).notNullable(),
                table.string('name_fant', 80).notNullable(),
                table.string('cnpj', 14).notNullable(),
                table.string('phone_number', 11).notNullable(),
                table.string('email', 50).notNullable();
        });
    });
}
exports.up = up;
function down(knex) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable('provider');
        yield knex.schema.dropTable('address');
    });
}
exports.down = down;
//# sourceMappingURL=001_2022_05_30_add_address.js.map