"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_URI);
const testResultsSchema = new mongoose_1.default.Schema({
    endPoint: { type: String, required: true },
    statusCode: { type: Number, required: true },
    responseTime: { type: Number, required: true },
    passed: { type: Boolean, required: true },
});
const testResultsModel = mongoose_1.default.model("TestResult", testResultsSchema);
exports.default = testResultsModel;
