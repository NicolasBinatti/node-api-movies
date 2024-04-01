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
const MoviesService_1 = __importDefault(require("./MoviesService"));
class ProducerService {
    getListMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            const movies = yield MoviesService_1.default.list();
            const Producers = [];
            for (const movie of movies) {
                const producerNames = movie.producers.replace(/\band\b/g, ',').split(',');
                for (const producerName of producerNames) {
                    const existingGroupIndex = Producers.findIndex((group) => group.name === producerName);
                    if (existingGroupIndex !== -1) {
                        Producers[existingGroupIndex].movies.push(movie);
                    }
                    else {
                        Producers.push({ name: producerName.trim(), movies: [movie] });
                    }
                }
            }
            const result = {};
            result.max = this.getMaxDiferenceBetweenYears(Producers).sort((a, b) => b.interval - a.interval);
            result.min = this.getMinDiferenceBetweenYears(Producers).sort((a, b) => a.interval - b.interval);
            return result;
        });
    }
    getMaxDiferenceBetweenYears(data) {
        const newWin = [];
        for (const win of this.getYearsInArray(data)) {
            const years = win.years.map((item) => {
                return isNaN(parseInt(item)) ? item : parseInt(item);
            });
            const firstYear = Math.min(...years);
            const lastYear = Math.max(...years);
            newWin.push({
                producer: win.producer,
                interval: lastYear - firstYear,
                previousWin: firstYear,
                followingWin: lastYear,
            });
        }
        return newWin;
    }
    getMinDiferenceBetweenYears(Producer) {
        const lazyWin = [];
        for (const win of this.getYearsInArray(Producer)) {
            win.years.sort((a, b) => a - b);
            let smallestDifference = Number.MAX_SAFE_INTEGER;
            var smallestYear = 0;
            let biggestYear = 0;
            for (const [key, year] of win.years.entries()) {
                if (key === 0) {
                    continue;
                }
                if (year - win.years[key - 1] < smallestDifference) {
                    smallestDifference = year - win.years[key - 1];
                    smallestYear = win.years[key - 1];
                    biggestYear = year;
                }
            }
            lazyWin.push({
                producer: win.producer,
                interval: smallestDifference,
                previousWin: smallestYear,
                followingWin: biggestYear,
            });
        }
        return lazyWin;
    }
    getYearsInArray(Producer) {
        const winningYearsByProducer = [];
        for (const entry of Producer) {
            const producerName = entry.name;
            const winningYears = [];
            for (const movie of entry.movies) {
                if (movie.winner) {
                    winningYears.push(movie.year);
                }
            }
            //Just who have more than 1 award
            if (winningYears.length > 1) {
                winningYearsByProducer.push({ producer: producerName, years: winningYears });
            }
        }
        return winningYearsByProducer;
    }
}
exports.default = new ProducerService();
