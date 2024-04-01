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
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const MoviesService_1 = __importDefault(require("./services/MoviesService"));
const client_1 = require("@prisma/client");
class App {
    constructor() {
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.host = process.env.HOST || 'http://localhost';
        this.config();
        this.fillMoviesTb();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use(routes_1.router);
        });
    }
    fillMoviesTb() {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const quantidade = yield prisma.movies.count();
            if (quantidade === 0) {
                yield MoviesService_1.default.createByCsv("movielist.csv");
            }
            return true;
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running: ${this.host}:${this.port}`);
        });
    }
}
exports.App = App;
