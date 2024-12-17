const express = require('express');
const app = express();
require('dotenv').config()

const dbConfig = require("./config/dbConfig");
app.use(express.json());

const staffRoute = require("./routes/staffRoute")
const studentRoute = require("./routes/studentRoute");

app.use('/api/staff',staffRoute);
app.use('/api/student', studentRoute);
const port = process.env.PORT || 5000;
app.listen(port, ()=>
{
    console.log(`App listening on port ${port}`);
})