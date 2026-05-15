"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Post_1 = __importDefault(require("./Post"));
let User = class User extends sequelize_typescript_1.Model {
    set email(value) {
        this.setDataValue("email", value ? value.toLocaleLowerCase() : value);
    }
    toJSON() {
        return Object.assign(Object.assign({}, this.get()), { created_at: undefined, updated_at: undefined });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        type: sequelize_typescript_1.DataType.BIGINT,
        autoIncrement: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        validate: {
            len: [3, 100],
        },
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.IsEmail,
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], User.prototype, "email", null);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Object)
], User.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Object)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Post_1.default),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "users",
        modelName: "User",
    })
], User);
exports.default = User;
//# sourceMappingURL=User.js.map