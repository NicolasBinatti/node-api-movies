"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const MoviesController_1 = __importDefault(require("./controllers/MoviesController"));
const MoviesValidator_1 = require("./validators/MoviesValidator");
const ProducerController_1 = __importDefault(require("./controllers/ProducerController"));
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (req, res) => {
    res.send({ ok: true });
});
router.get("/movies", MoviesController_1.default.get);
router.get("/movies/:id", MoviesController_1.default.find);
router.post("/movies", MoviesValidator_1.ValidationCreateMovie, MoviesController_1.default.create);
router.delete("/movies/:id", MoviesController_1.default.delete);
router.get("/producer/awards", ProducerController_1.default.getAwards);
