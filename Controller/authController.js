const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Teacher = require('../Model/teacherModel');
require("dotenv").config();
const adminUser = {
    email: "admin.admin@gmail.com",
    password: "adminPassword",
    role: "admin"
};

exports.login = (req, res, next) => { 
    const { email, password } = req.body;
    let user;

    if (email === adminUser.email && password === adminUser.password) {
        user = adminUser;
        generateTokenAndRespond(user, res);
    } else {
        Teacher.findOne({ email })
            .then(teacherData => {
                if (!teacherData) {
                    let error = new Error("User not found");
                    error.status = 401;
                    throw error;
                }
                user = teacherData;
                return bcrypt.compare(password, teacherData.password);
            })
            .then(result => {
                if (!result) {
                    let error = new Error("Password is incorrect");
                    error.status = 401;
                    throw error;
                }
                generateTokenAndRespond(user, res);
            })
            .catch(error => {
                next(error);
            });
    }
};

function generateTokenAndRespond(user, res) {
    const token = jwt.sign({ 
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role, 
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" });

    res.status(200).json({
        message: "Login successful",
        token: token
    });
}