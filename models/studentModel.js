const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    rollNum: {
        type: String,
        required : true 
    } ,
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    class : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    results:{
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('students', studentSchema);
