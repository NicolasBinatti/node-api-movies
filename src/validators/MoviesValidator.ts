import {checkSchema} from "express-validator";
import {validator} from "./Validator";
import {IsBooleanOptions} from "express-validator/src/options";

const ValidationCreateMovie = validator([
    checkSchema({
        year: {
            notEmpty: {errorMessage: 'The Year must not be empty'},
            isInt: {errorMessage: 'The Year must be Integer'},
        },
        title: {
            notEmpty: {errorMessage: 'The Title must not be empty'},
            isString: {errorMessage: 'The Title must be string'},
        },
        studios: {
            notEmpty: {errorMessage: 'The Studios must not be empty'},
            isString: {errorMessage: 'The Studios must be string'},
        },
        producers: {
            notEmpty: {errorMessage: 'The Producers must not be empty'},
            isString: {errorMessage: 'The Producers must be string'},
        },
        winner: {
            notEmpty: {errorMessage: 'The Winner must not be empty'},
            isBoolean: {errorMessage: 'The Winner must be boolean'},
        },
    })
]);
export {ValidationCreateMovie};
