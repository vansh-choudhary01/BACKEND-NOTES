"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const start_services_1 = require("./start.services");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, start_services_1.init)();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
