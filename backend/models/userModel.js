const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name:String,
    email:{
        type:String,
        unique: true
    },
    password:String,
    appointments:[{
        doctorId: { type: schema.Types.ObjectId, ref: 'Doctor' },
        slotId: { type: schema.Types.ObjectId } 
    }]
})

module.exports = mongoose.model('User', userSchema);