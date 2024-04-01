import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

function validator(validations: any) {
    return [validations, (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        return next();
    }];
}

export {validator};
