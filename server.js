const express = require('express');
const app = express();
require('dotenv').config()

const dbConfig = require("./config/dbConfig");
app.use(express.json());
//routes
const staffRoute = require("./routes/staffRoute")
const studentRoute = require("./routes/studentRoute");
const resultRoute = require("./routes/resultRoute");

app.use('/api/staff',staffRoute);
app.use('/api/student', studentRoute);
app.use("/api/result",resultRoute);


const path = require('path');

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>
{
    console.log(`App listening on port ${port}`);
})