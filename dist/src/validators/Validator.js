"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const express_validator_1 = require("express-validator");
function validator(validations) {
    return [validations, (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }
            return next();
        }];
}
exports.validator = validator;
