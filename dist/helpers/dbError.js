"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbError = void 0;
class DbError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DbError';
        this.message;
    }
}
exports.DbError = DbError;
//# sourceMappingURL=dbError.js.map