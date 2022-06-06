"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const knex_1 = tslib_1.__importDefault(require("knex"));
const config = tslib_1.__importStar(require("../knexfile"));
const db = (0, knex_1.default)(config);
exports.default = db;
//# sourceMappingURL=database.js.map