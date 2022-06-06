"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const tslib_1 = require("tslib");
const dbError_1 = require("@helpers/dbError");
const httpError_1 = require("@helpers/httpError");
class AddressService {
    constructor(repository) {
        this.repository = repository;
    }
    get(id_address) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let address = yield this.repository.getById(id_address);
            if (!address) {
                throw new httpError_1.HttpError({ message: 'Endereço não encontrado', status: 404 });
            }
            return address;
        });
    }
    update(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!data.city || !data.comp || !data.street || !data.zip_code || !data.state || !data.id_address) {
                throw new dbError_1.DbError('Endereço não Atualizado');
            }
            return data;
        });
    }
}
exports.AddressService = AddressService;
//# sourceMappingURL=service.js.map