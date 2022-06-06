"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const httpError_1 = require("@helpers/httpError");
const service_1 = require("@services/Address/service");
const address_1 = require("@models/address");
class addressController {
    constructor() {
        this.service = new service_1.AddressService(address_1.AddressRepository);
    }
    address(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id_address } = req.params;
            const service = new service_1.AddressService(address_1.AddressRepository);
            try {
                let address = yield service.get(id_address);
                res.status(200).json(address);
            }
            catch (e) {
                if (e instanceof httpError_1.HttpError) {
                    res.status(e.status).json(e.message);
                }
                console.error(e);
                res.status(500).json('Erro Não Indentificado');
            }
        });
    }
    UpdateAddress(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = req.params;
            const service = new service_1.AddressService(address_1.AddressRepository);
            try {
                let address = yield service.update(data);
                res.status(200).json(address);
            }
            catch (e) {
                if (e instanceof httpError_1.HttpError) {
                    res.status(e.status).json(e.message);
                }
                console.error(e);
                res.status(500).json('Erro Não Indentificado');
            }
        });
    }
}
const controller = new addressController();
exports.default = controller;
//# sourceMappingURL=addressController.js.map