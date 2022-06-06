"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("dotenv/config");
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const express = require('express');
const app = express();
app.use((0, morgan_1.default)('dev'));
app.use(routes_1.default);
app.use(express.json());
app.listen(3003, () => console.log('Server is Open 🟢 http://localhost:3003'));
//# sourceMappingURL=index.js.map