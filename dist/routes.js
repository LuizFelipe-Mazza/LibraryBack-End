"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const addressController_1 = tslib_1.__importDefault(require("./controller/addressController"));
const router = (0, express_1.Router)();
router.get('/address/:id_address', addressController_1.default.address);
router.put('/update/:id_address', addressController_1.default.UpdateAddress);
exports.default = router;
//# sourceMappingURL=routes.js.map