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
exports.CsvReader = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = require("csv-parse");
class CsvReader {
    readCSV(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = [];
            return new Promise((resolve, reject) => {
                const fileStream = fs_1.default.createReadStream(path);
                fileStream.on('error', (error) => {
                    reject(new Error(`File not found: ${error.message}`));
                });
                const rows = [];
                fileStream.pipe((0, csv_parse_1.parse)({ delimiter: ";", from_line: 5 }))
                    .on("data", function (row) {
                    const csvRow = {
                        year: parseInt(row[0]),
                        title: row[1],
                        studios: row[2],
                        producers: row[3],
                        winner: row[4] !== "",
                    };
                    rows.push(csvRow);
                })
                    .on('end', () => {
                    resolve(rows);
                })
                    .on('error', (error) => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    }
}
exports.CsvReader = CsvReader;
