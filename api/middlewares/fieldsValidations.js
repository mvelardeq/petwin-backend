import { validationResult } from "express-validator";


export const fieldsValidation = (req, res, next)=>{
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) return res.status(400).send(errors);

    next()

}


