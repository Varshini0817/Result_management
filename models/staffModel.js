const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    staffId :{
        type : String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required : true,
    },
    isApproved :{
        type: Boolean,
        default : false
    }
});

module.exports = mongoose.model('staffMembers', staffSchema);