const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log('Mongo DB connected!');
})
.catch((err)=>{
    console.error(err.message);
})

module.exports = mongoose;