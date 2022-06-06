"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../../database"));
class AddressRepository {
    getById(id_address) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let address = undefined;
            try {
                const addressFounded = yield database_1.default
                    .raw('SELECT * FROM address WHERE id_address = ?', [id_address])
                    .debug(true);
                address = addressFounded[0][0];
            }
            catch (e) {
                console.error(e);
            }
            return address;
        });
    }
    update(id_address, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let address = undefined;
            try {
                const updateAddress = yield database_1.default.raw('UPDATE address SET zip_code = ?, state = ?, city = ?, street = ?, number = ?, SET comp = ? WHERE = ?', [
                    id_address,
                    data.zip_code,
                    data.state,
                    data.city,
                    data.street,
                    data.number,
                    data.comp,
                ]);
                address = updateAddress[0][0];
            }
            catch (e) {
                console.error(e);
            }
            return address;
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not Implemented yet');
        });
    }
    paginate(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not Implemented yet');
        });
    }
    create(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not Implemented yet');
        });
    }
}
exports.default = new AddressRepository();
//# sourceMappingURL=repository.js.map