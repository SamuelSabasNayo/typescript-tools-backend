"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("../config"));
const sequelize = new sequelize_typescript_1.Sequelize(Object.assign(Object.assign({}, config_1.default.db), { models: [__dirname + "/models"] }));
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map