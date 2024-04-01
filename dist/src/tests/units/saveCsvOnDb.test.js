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
const MoviesService_1 = __importDefault(require("../../services/MoviesService"));
const client_1 = require("@prisma/client");
describe("Test Read CSV and Save on DB", () => {
    const prisma = new client_1.PrismaClient();
    it('Should read csv and insert on movies db', () => __awaiter(void 0, void 0, void 0, function* () {
        const created = yield MoviesService_1.default.createByCsv("movielist.csv");
        expect(typeof created).toBe("number");
    }));
    it('Should get Error if path do not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const created = yield MoviesService_1.default.createByCsv("qwe.csv");
            fail('File not found');
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    }));
});
