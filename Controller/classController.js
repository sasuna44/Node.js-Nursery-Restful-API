const Class = require('../Model/classModel');
const Child = require('../Model/childModel');
const Teacher = require('../Model/teacherModel');

exports.getAllClass = (req, res, next) => {
    Class.find().populate('supervisorName')
    .then(data => {    
        res.status(200).json({ data: data });
    })
    .catch(err => {
     throw next(err);
    });
 }

exports.getClassById = (req, res, next) => {
    Class.findById(req.params.id)
    .then(data => {   
        if(!data)   res.status(404).json({ message: "Class not found" });

        res.status(200).json({ data: data });
    })
    .catch(err => {
        next(err);
    });
}

exports.createClass = (req, res, next) => {
    let object = new Class(req.body);
    console.log(req.body);
    object.save()
        .then(data => {
            res.status(200).json({ 
                message: "Class created successfully",
                data : data 
            });
        })
        .catch(err => {
            next(err);
        });
};


exports.updateClass = (req, res, next) => {
    let objectId = req.params.id;
    Class.findByIdAndUpdate(objectId, req.body, { new: true })
    .then(data => {
        res.status(200).json({
            message: "Class updated successfully",
            data: data 
        });
    })
    .catch(err => {
        next(err);
    });
};

exports.deleteClass = (req, res, next) => {
    let classId = req.params.id;
    Class.findByIdAndDelete(classId)
    .then(data => {   
        res.status(200).json({ 
            message: "Cladd deleted successfully",
            data: data });
    })
    .catch(err => {   
        next(err);
    });
}

exports.getClassByTeacher = (req, res, next) => {
    const classId = req.params.id;
    Class.findById(classId).populate("supervisorName").select({supervisorName: 1})
    .then(classData => {
      if(!classData) res.status(404).json({ message: "Class not found" });
        res.status(200).json({ data: classData.supervisorName });
      
    })
    .catch(err => {
        next(err);
    });
}

exports.getChildData = (req, res, next) => {  
    let classId = req.params.id;
    Class.findById(classId).populate("child")
    .then(data => {
        if(!data)   res.status(404).json({ message: "id not found" });

        res.status(200).json({ data: data.child});
    
    })
    .catch(err => {
        next(err);
    });
}
