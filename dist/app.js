"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get('/', (req, res) => {
    res.send('Hello SamuelNayo!');
});
app.all('*', (req, res) => {
    return res.status(404).json(`Can't find ${req.originalUrl} path on this server!`);
});
const { PORT = 5000 } = process.env;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
//# sourceMappingURL=app.js.map