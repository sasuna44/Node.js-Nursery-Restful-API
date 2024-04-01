const mongoose = require('mongoose');   
const AutoIncrement = require('mongoose-sequence')(mongoose);

const teacherSchema = new mongoose.Schema({
    _id :{ type: Number },
    fullName :{ type: String , required: true},
    email :{ type: String , required: true , unique: true}, 
    password:{type:String , required: true },
    image :{ type: String }
}); 
// teacherSchema.plugin(AutoIncrement, { inc_field: '_id' });
module.exports = mongoose.model('Teacher' , teacherSchema);