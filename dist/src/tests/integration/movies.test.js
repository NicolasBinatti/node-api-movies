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
const app_1 = require("../../app");
const supertest_1 = __importDefault(require("supertest"));
const client_1 = require("@prisma/client");
describe("Test create new MovieService", () => {
    const app = new app_1.App().app;
    const prisma = new client_1.PrismaClient();
    //SUCCESS
    it('Should return all Movies registered', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/movies");
        expect(typeof response.body).toBe("object");
    }));
    it('Should check if create a Movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/movies").send({
            "year": 1995,
            "title": "Title Test",
            "studios": "Studio Test Creating",
            "producers": "Jest Testing",
            "winner": true
        });
        expect(response.statusCode).toBe(201);
    }));
    it('Should return the last Movie registered', () => __awaiter(void 0, void 0, void 0, function* () {
        const lastMovie = yield prisma.movies.findFirst({ orderBy: { id: 'desc' } });
        if (lastMovie == null)
            return;
        const response = yield (0, supertest_1.default)(app).get(`/movies/${lastMovie.id}`);
        expect(typeof response.body).toBe("object");
        expect(response.statusCode).toBe(200);
    }));
    it('Should return the last Movie registered', () => __awaiter(void 0, void 0, void 0, function* () {
        const lastMovie = yield prisma.movies.findFirst({ orderBy: { id: 'desc' } });
        if (lastMovie == null)
            return;
        const response = yield (0, supertest_1.default)(app).delete(`/movies/${lastMovie.id}`);
        expect(response.statusCode).toBe(204);
    }));
    //FAIL
    it('Should return empty if the id Movie not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const lastMovie = yield prisma.movies.findFirst({ orderBy: { id: 'desc' } });
        if (lastMovie == null)
            return;
        const response = yield (0, supertest_1.default)(app).get(`/movies/${lastMovie.id + 1}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeNull();
    }));
    it('Should return error when try to create new register without title', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/movies").send({
            "year": 1995,
            "studios": "Jest Testing",
            "producers": "Jest Testing",
            "winner": true
        });
        expect(response.statusCode).toBe(400);
        expect(typeof response.body).toBe("object");
    }));
    it('Should return error when try to create with winner without a bool', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/movies").send({
            "year": 1995,
            "studios": "Jest Testing",
            "winner": true
        });
        expect(response.statusCode).toBe(400);
        expect(typeof response.body).toBe("object");
    }));
});
