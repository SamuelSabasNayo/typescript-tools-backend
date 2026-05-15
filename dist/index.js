"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const sequelize_1 = __importDefault(require("./db/sequelize"));
const User_1 = __importDefault(require("./models/User"));
const Post_1 = __importDefault(require("./models/Post"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield sequelize_1.default.transaction((t) => __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield User_1.default.create({
                name: "John Doe",
                email: "john.doe@example.com",
                posts: [
                    {
                        title: "My First Post",
                        content: "This is the content of my first post.",
                        published: true,
                    },
                ],
            }, {
                include: [Post_1.default],
                transaction: t,
            });
            return createdUser;
        }));
        const userWithPosts = yield User_1.default.findByPk(user.id, {
            include: [Post_1.default],
        });
        console.log("Created user:", userWithPosts);
        const allUsers = yield User_1.default.findAll({
            include: [Post_1.default],
        });
        console.log("All users:", JSON.stringify(allUsers.map((u) => u.toJSON()), null, 2));
    });
}
main().catch((error) => {
    console.error("Error in main:", error);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize_1.default.close();
}));
//# sourceMappingURL=index.js.map