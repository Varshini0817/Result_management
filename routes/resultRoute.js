const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const router = express.Router();
const Result = require("../models/resultModel");
const Student = require("../models/studentModel");

router.post("/add-result", authmiddleware, async (req, res) => {
    try {
        const resultExists = await Result.findOne({
            examination: req.body.examination,
            class : req.body.class
        })
        if (resultExists) {
            return res.status(200).send({
                message: "Result already exists",
                success: false
            })
        }

        const newResult = new Result(req.body);
        await newResult.save();
        res.status(200).send({
            message: "Results saved successfully !",
            success: true
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

//get all results
router.post("/get-all-results", async (req, res) => {
    try {
        const results = await Result.find({});
        if (results) {
            return res.status(200).send({
                message: "Results retrieved successfully !",
                success: true,
                data: results
            })
        }
        return res.status(200).send({
            message: "No results found",
            success: false,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }

})

//get result by id
router.post("/get-result/:resultId", async (req, res) => {
    try {
        const result = await Result.findById(req.params.resultId);
        if (result) {
            return res.status(200).send({
                message: "Results retrieved successfully !",
                success: true,
                data: result
            })
        }
        return res.status(200).send({
            message: "No results found",
            success: false,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})


//save student results
router.post("/save-student-result", authmiddleware, async (req, res) => {
    try {
        const student = await Student.findById(req.body.studentId);
        if (!student) {
            return res.status(200).send({
                message: "Student not found",
                success: false
            })
        }
        let newResults = student.results;
        const existingResults = student.results;
        const resultExists = existingResults.find(
            (result) => result.resultId === req.body.resultId
        )
        if (resultExists) {
            newResults = existingResults.map((result) => {
                if (result.resultId === req.body.resultId) {
                    return {
                        ...result,
                        obtainedMarks: req.body.obtainedMarks,
                        verdict: req.body.verdict
                    }
                }
                return result;
            })
        }
        else {
            newResults = [
                ...existingResults,
                {
                    obtainedMarks: req.body.obtainedMarks,
                    verdict: req.body.verdict,
                    resultId: req.body.resultId,
                    examination: req.body.examination
                }
            ]
        }


        //updating in student data
        const updatedStudent = await Student.findByIdAndUpdate(
            req.body.studentId,
            {
                results: newResults
            },
            { new: true }
        )
        //await updatedStudent.save();
        return res.status(200).send({
            message: "Results saved successfully !",
            success: true,
            data: updatedStudent
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

//get student result
router.post('/get-student-result', async (req, res) => {
    try {
        const student = await Student.findOne({
            rollNum: req.body.rollNum
        });
        if (!student) {
            return res.status(200).send({
                message: "Invalid roll number",
                success: false
            })
        }
        const resultExists = student.results.find(
            (result) => result.resultId === req.body.resultId
        )
        if (!resultExists) {
            return res.status(200).send({
                message: "Results not found",
                success: false
            })
        }
        return res.status(200).send({
            message: "Results found !",
            success: true,
            data: {
                ...resultExists,
                studentRollNum: student.rollNum,
                firstName: student.firstName,
                lastName: student.lastName,
                verdict: resultExists.verdict
            },
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

//search results
router.post('/search-all-results', authmiddleware, async (req, res) => {
    try {
        const { text } = req.body;
        // Validate input
        if (!text || text.trim() === "") {
            return res.status(400).send({
                message: "Search term is required",
                success: false,
            });
        }
        // Define the query
        let query = { examination: { $regex: text, $options: "i" } };
        const results = await Result.find(query);
        if (results.length == 0) {
            return res.status(200).send({
                message: "No results found !",
                success: false,
                data: []
            })
        }
        return res.status(200).send({
            message: "Results found !",
            data: results,
            success: true
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})
module.exports = router;