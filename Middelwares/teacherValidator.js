const {body , param , query } = require('express-validator');
exports.bodyValidation = [
    body('fullName')
    .isAlpha()
    .withMessage('fullName must be string')
    .isLength({min: 3 , max: 30})
    .withMessage('fullName must be between 3 and 30 characters')
    ,
    body('password')
    .isStrongPassword()
    .withMessage('password must be mix of numbers and string')
    .isLength({min: 6}) 
    .withMessage('password must be at least 6 characters')
    ,
    body('email')
    .isEmail()
    .withMessage('email must be valid email')
    

];

exports.chagePasswordValidator=[
    body('newPassword').isStrongPassword().withMessage('password must be mix of numbers and string')
];
