const express = require('express');
const router = express.Router();
const Student = require("../models/studentModel");
const authMiddleware = require('../middlewares/authmiddleware')
//add new student
router.post("/add-student", authMiddleware, async(req,res)=>{
    try {
        // Trim only string values and preserve other types
        const trimmedData = {};
        Object.keys(req.body).forEach(key => {
            const value = req.body[key];
            trimmedData[key] = (typeof value === "string") ? value.trim() : value;
        });
        const studentExists = await Student.findOne({
            rollNum : trimmedData.rollNum,
        })
        if(studentExists){
            return res.status(200).send({
                message: "Student already exists",
                success: false
            })
        }
        const newStudent = new Student(trimmedData);
        await newStudent.save();
        return res.status(200).send({
            message : "Student successfully added",
            success: true
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

//get all students
router.post("/get-all-students", authMiddleware, async(req,res)=>{
    try {
        const students = await Student.find({});
        return res.status(200).send({
            message: "Students fetched successfully",
            success: true,
            data: students
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
});

//get student by rollnumber
router.post("/get-student/:rollNum", authMiddleware, async(req,res)=>{
    try {
        const student = await Student.findOne({
            rollNum : req.params.rollNum
        })
        if(student){
            return res.status(200).send({
                message: "Student details fetched successfully",
                success: true,
                data: student
            })
        }
        return res.status(200).send({
            message: "Student not found",
            success: false
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

//update student by id 
router.post("/update-student/:rollNum", authMiddleware, async(req,res)=>{
    try {
        const student = await Student.findOneAndUpdate(
            {rollNum : req.params.rollNum},
            req.body,
            { new: true }
        );
         res.status(200).send({
                message: "Student details upated successfully",
                success: true,
                data: student,
            })
        
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})


//delete student by rollnum
router.post("/delete-student/:rollNum", authMiddleware, async(req,res)=>{
    try {
        const student = await Student.findOneAndDelete({
            rollNum: req.params.rollNum
        })
        return res.status(200).send({
            message: "Student deleted successfully",
            success: true
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success : false
        })
    }
})

module.exports = router;