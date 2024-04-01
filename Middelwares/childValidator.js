const {body , param , query } = require('express-validator');
exports.bodyValidation = [
    body('fullName')
    .notEmpty()
    .withMessage('fullName is required')
    .isAlpha()
    .withMessage('fullName must be string')
    .isLength({ min: 3, max: 50 })
    .withMessage('fullName must be between 3 and 30 characters')
    ,
    body('age')
    .notEmpty()
    .withMessage('age is required')
    .isNumeric({ min: 1, max: 7})
    .withMessage('age must be between 1 and 7 years ')
    .custom((value)=>{
        if(value < 0) {
            throw new Error('age must be positive');
        }
        return true ;
    })
    ,
    body('level')
    .notEmpty()
    .withMessage('level is required')
    .isIn(['PreKG', 'KG1', 'KG2'])
    .withMessage('level must be PreKG, KG1, or KG2')
    .custom((value)=>{
        if(value !== 'PreKG' && value !== 'KG1' && value !== 'KG2') {
            throw new Error('level must be PreKG, KG1, or KG2');
        }
        return true ;
    })
    ,
    body("city")
    .isString()
    .withMessage("City must be a string"),
    body("street")
    .isString()
    .withMessage("Street must be a string"),
    body("building")
    .isString()
    .withMessage("Building must be a number")
];
