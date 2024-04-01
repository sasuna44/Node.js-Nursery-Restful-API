const {body , param  } = require('express-validator');
exports.bodyValidation = [
    body('fullName')
    .notEmpty()
    .withMessage('Name is required')
    .isAlpha()
    .withMessage('Name must be string')
    .isLength({min: 2})
    .withMessage('fullName must be at least 4 characters')
    ,
    body('supervisorName')
    .notEmpty()
    .withMessage('supervisorName is required')
   .isObject()
   .withMessage('supervisor Name must be valid teacher id')
    ,
    body('childrens')
    .isArray()
    .withMessage('childrens must be array of ids')
    
];
