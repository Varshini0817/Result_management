const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const router = express.Router();
const Result = require("../models/resultModel");

router.post("/add-result", authmiddleware, async(req, res)=>{
    try {
        const resultExists = await Result.findOne({
            examination : req.body.examination
        })
        if(resultExists){
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
router.post("/get-all-results", authmiddleware, async(req,res)=>{
    console.log("Get all results");
})

module.exports = router;