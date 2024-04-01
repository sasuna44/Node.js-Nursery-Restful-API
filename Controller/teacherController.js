const Teacher = require('../Model/teacherModel');
const Class = require('../Model/classModel');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

exports.getAllTeacher = (req, res, next) => {
    Teacher.find({})
    .then(data =>{
        res.status(200).json({ data:data });
    })
    .catch(error => {
        next(error);
    });
    
};

exports.getTeacherById = (req, res, next) => {
    Teacher.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ error: 'Teacher not found' });
            }
            res.status(200).json({ data: data });
        })
        .catch(error => {
            next(error);
        });
};

exports.addTeacher = (req, res, next) => {
    console.log(req.file);
    const image = req.file.path;
    const {fullName , email , password} = req.body;
    const hashedpassword = bycrpt.hashSync(password, 10);
    const teacher = new Teacher({fullName:fullName , email:email , password: hashedpassword , image : image} );
    teacher.save()
    .then(teacher => {
        const token = jwt.sign({ id: teacher._id , email: teacher.email, fullName: teacher.fullName, role : "teacher" }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ 
            message: "Teacher added successfully",
            data: teacher,
            token: token });
    })
    .catch(error => {   
         next(error);})
};

exports.updateTeacher = (req, res, next) => {
    let teacherId = req.params.id;
    console.log(req.body);
    Teacher.findByIdAndUpdate(teacherId , req.body , {new:true})  
    .then(teacher => { 
        if(req.file){
            const image = teacher.image;
            fs.unlinkSync(image, (error)=>{
                if(error){next(error); }
            });
            teacher.image = req.file.path;
            teacher.save();

        }
        res.status(200).json({
            message: "Teacher updated successfully ",
            data: teacher });
    })
    .catch(error => { 
         next(error);
    })
};

exports.deleteTeacher = (req, res, next) => {
    let objectId = req.params.id;
    
    Teacher.findByIdAndDelete(objectId)
        .then(data => {
            if (data.deletedCount === 0) {
                console.log(`Teacher with id ${objectId} is not found`);
                return res.status(404).json({ message: "Teacher not found" });
            }
            const image = data.image;
            if (image) {
                fs.unlinkSync(image, (error) => {if (error) {next(error);}});
            }

            res.status(200).json({ message: "Teacher deleted successfully", data: data });
        })
        .catch(error => {
            next(error);
        });
};

exports.getAllClassesSupervisor = (req, res, next) => {
   Class.find().populate("supervisorName").select({supervisorName: 1})
   .then(data =>{
       res.status(200).json({ data: data });})
       .catch(error => {
        next(error);
    });
};

exports.changePassword = (req, res, next) => {  
    const {_id, oldPassword, newPassword } = req.body;
    Teacher.findById(_id)
    .then(teacher => {
        if(!teacher){return res.status(404).json({message: "Teacher not found"})}
    })
    bycrpt.compare(oldPassword, teacher.password)
    .then((Match)=>{
        if(!Match){return res.status(400).json({message: "password is incorrect"})}
        const hashedpassword = bycrpt.hashSync(newPassword, 10);
        Teacher.findByIdAndUpdate(_id, {password: hashedpassword})
        .then(data => {
            res.status(200).json({message: "password updated successfully", data : data})
        })
        .catch(error => {
            res.status(500).json({message: "error updating password"})
        })
    })
    .catch(error => {
        res.status(500).json({message: "error updating password"})
    })
    .catch(error => {
        res.status(500).json({message: "error updating password"})
    }  ) 
}