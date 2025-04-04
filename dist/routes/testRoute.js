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
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("../models"));
const testRoutes = express_1.default.Router();
function testApi(api) {
    return __awaiter(this, void 0, void 0, function* () {
        const startingTime = Date.now();
        try {
            const response = yield axios_1.default.get(api);
            const responsetime = Date.now() - startingTime;
            const responseStatus = response.status;
            const testResults = new models_1.default({
                endPoint: api,
                statusCode: responseStatus,
                passed: responseStatus === 200,
                responseTime: responsetime
            });
            yield testResults.save();
            return {
                endPoint: api,
                statusCode: responseStatus,
                passed: responseStatus === 200,
                responseTime: responsetime,
            };
        }
        catch (error) {
            console.log(error);
        }
    });
}
testRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { api } = req.body;
    const response = yield testApi(api);
    res.json(response);
}));
exports.default = testRoutes;
