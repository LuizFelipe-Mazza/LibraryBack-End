"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressUpdate = void 0;
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("database"));
exports.addressUpdate = database_1.default.raw('UPDATE address SET = ? WHERE id_address = ?');
//# sourceMappingURL=contextAdressRepository.js.map