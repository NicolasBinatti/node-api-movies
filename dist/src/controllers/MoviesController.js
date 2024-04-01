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
const MoviesService_1 = __importDefault(require("../services/MoviesService"));
class MoviesController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const movies = yield MoviesService_1.default.list();
            res.status(200).json(movies);
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const movie = yield MoviesService_1.default.find(id);
            res.status(200).json(movie);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMovie = yield MoviesService_1.default.create(req.body);
                return res.status(201).json();
            }
            catch (error) {
                return res.status(500).json({ error: 'Server error' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const movie = yield MoviesService_1.default.delete(id);
            res.status(204).json();
        });
    }
}
exports.default = new MoviesController();
