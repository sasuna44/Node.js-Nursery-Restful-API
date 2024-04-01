const Child = require('../Model/childModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const fs = require('fs');

exports.getAllStudent = (req, res, next) => {
    Child.find()
        .then(data => {
            res.status(200).json({ data: data });
        })
        .catch(error => {
            next(error);  
        });
}

exports.getStudentById = (req, res, next) => {
    Child.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.status(200).json({ data: data });
        })
        .catch(error => {
            next(error); 
        });
};

exports.addStudent = (req, res, next) => {
    console.log(req.body);
    const image = req.file.path;
    const {_id , fullName, age, level , city , street , building} = req.body;
    const address = {city :city , street : street , building :building };
    // const hashedpassword = bcrypt.hashSync(password, 10);
    const student = new Child({_id:_id, fullName:fullName , age:age , level:level , address : address , image : image});  
    student.save()
    .then(student => {
        const token = jwt.sign({ id: student._id , fullName : student.fullName , role: 'Student'}, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ 
            message: "student added successfully",
            data: student,
            token: token });
    })
    .catch(error => {   
         next(error);})
};

 exports.updateStudent = (req, res, next) => {
    const objId = req.params.id;
    const updateData = req.body;
    console.log(updateData);
    Child.findByIdAndUpdate(objId, updateData, { new: true })
        .then(student => {
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            if(req.file){
                const image = student.image;
                if(image){
                    fs.unlinkSync(image , (error)=> {
                        if (error) {
                         next(error);
                        }
                    }) ;
                }
                student.image = req.file.path;
                student.save();
                // console.log(student);
            }
            res.status(200).json({
                message: 'Student updated successfully',
                student: student
            });
        })
        .catch(error => {   
            next(error);
        })
      
};
exports.deleteStudent = (req, res, next) => {
    const studentId = req.params.id; 

    if (!studentId) {
        return res.status(400).json({ error: 'Student ID is missing in the request' });
    }

    Child.findByIdAndDelete(studentId)
        .then(data => {
           const image = data.image;
           fs.unlinkSync(image , (error)=> {
            if (error) {
             next(error);
            }
        })
            res.status(200).json({ 
                message: 'Student deleted successfully',
            });
        })
        .catch(error => {
            next(error);  
        });
};