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
const ReadCsvService_1 = require("../../services/ReadCsvService");
describe("Test Read CSV", () => {
    const Reader = new ReadCsvService_1.CsvReader();
    //SUCCESS
    it('Should read csv and return data in a object', () => __awaiter(void 0, void 0, void 0, function* () {
        const csv = yield Reader.readCSV("movielist.csv");
        expect(typeof csv).toBe("object");
    }));
    //FAIL
    it('Should get Error if path do not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Reader.readCSV("xyz.csv");
            fail('File not found');
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    }));
});
