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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ReadCsvService_1 = require("./ReadCsvService");
const prisma = new client_1.PrismaClient();
class MoviesService {
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.movies.findMany();
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.movies.findUnique({ where: { id: id } });
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.movies.create({
                data: {
                    year: body.year,
                    title: body.title,
                    studios: body.studios,
                    producers: body.producers,
                    winner: body.winner,
                }
            }).then();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = prisma.movies.findUnique({ where: { id: id } }).then();
        });
    }
    createByCsv(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const Reader = new ReadCsvService_1.CsvReader();
            const csv = yield Reader.readCSV(path);
            if (csv instanceof Error) {
                return csv;
            }
            let count = 0;
            for (const movie of csv) {
                yield this.create(movie);
                count += 1;
            }
            return count;
        });
    }
}
exports.default = new MoviesService();
