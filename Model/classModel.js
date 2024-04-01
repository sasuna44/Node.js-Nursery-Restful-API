const mongoose  = require('mongoose');  
const AutoIncrement = require('mongoose-sequence')(mongoose);

const classSchema = mongoose.Schema({
    _id:{type:Number},
    fullName:{type:String ,  minlength: 3 , require :true ,}, 
    supervisorName :{type:mongoose.Schema.Types.ObjectId , required: true, ref:'Teacher'},
    childrens:[{type:Number , required: true , ref:'Child'}]

}, { _id: false });
classSchema.plugin(AutoIncrement,{ inc_field:"_id"});
module.exports = mongoose.model('Class',classSchema);