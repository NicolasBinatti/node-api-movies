"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationCreateMovie = void 0;
const express_validator_1 = require("express-validator");
const Validator_1 = require("./Validator");
const ValidationCreateMovie = (0, Validator_1.validator)([
    (0, express_validator_1.checkSchema)({
        year: {
            notEmpty: { errorMessage: 'The Year must not be empty' },
            isInt: { errorMessage: 'The Year must be Integer' },
        },
        title: {
            notEmpty: { errorMessage: 'The Title must not be empty' },
            isString: { errorMessage: 'The Title must be string' },
        },
        studios: {
            notEmpty: { errorMessage: 'The Studios must not be empty' },
            isString: { errorMessage: 'The Studios must be string' },
        },
        producers: {
            notEmpty: { errorMessage: 'The Producers must not be empty' },
            isString: { errorMessage: 'The Producers must be string' },
        },
        winner: {
            notEmpty: { errorMessage: 'The Winner must not be empty' },
            isBoolean: { errorMessage: 'The Winner must be boolean' },
        },
    })
]);
exports.ValidationCreateMovie = ValidationCreateMovie;
