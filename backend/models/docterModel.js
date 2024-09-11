const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const docSchema = new Schema({
    email:{type:String, unique:true},
    password: String,
    name: String,
    specalization: String,
    age:{type:Number, min:18, max:65},
    hospital: String,
    location: String,
    slots:[{
        timing:String,
        date: { type: Date },
        isBooked:Boolean,
        bookedBy: { type: Schema.Types.ObjectId, ref: 'User' }
    }],
})

module.exports = mongoose.model('Doctor', docSchema);