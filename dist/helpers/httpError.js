"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(params) {
        super(params.message);
        this.name = 'HttpError';
        this.message;
        this.status = params.status;
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=httpError.js.map