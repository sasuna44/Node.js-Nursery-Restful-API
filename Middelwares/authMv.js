const jwt = require('jsonwebtoken');    

module.exports = (req, res, next) => {
    try {
        let token = req.get('Authorization').split(' ')[1];
        let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.token = decodedToken;
        next();
    }
    catch (error) {
        error.message = 'you are not authorized';
        error.statusCode = 401;
        next(error);
    }
}
module.exports.Admin = (req , res , next) => { 
    if (req.token.role !=='admin') {
        const error = new Error('you are not authorized');
        error.statusCode = 401;
        next(error);
    }else{
        next();
    }
};
module.exports.Teacher = (req, res, next) => {
    if (req.token.role !== 'teacher') {
        const error = new Error('you are not authorized');
        error.statusCode = 401;
        next(error);
    }else{
        next();
    }
};