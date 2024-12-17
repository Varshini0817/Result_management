const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { ModifiedPathsSnapshot } = require("mongoose");
const router = express.Router();

router.post("/get-all-results", authmiddleware, async(req,res)=>{
    console.log("Get all results");
})

module.exports = router;