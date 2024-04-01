const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const addressSchema = new mongoose.Schema({
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: Number, required: true }
}, { _id: false });

const childSchema = mongoose.Schema({
    _id: { type: Number },
    fullName: { type: String, required: true },
    age: { type: Number, required: true, min: 1, max: 7 },
    level: { type: String, required: true, enum: ['PreKG', 'KG1', 'KG2'] },
    address: { type: addressSchema, required: true },
    image: { type: String, required: true }
}, { _id: false });

childSchema.plugin(AutoIncrement, { id: 'child_id', inc_field: '_id' });
module.exports = mongoose.model('Child', childSchema);
