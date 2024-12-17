const express = require('express');
const router = express.Router();
const Staff = require('../models/staffModel');
const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authmiddleware = require('../middlewares/authmiddleware');

//register a new staff member
router.post("/register", async(req, res)=>{
    try{
        const staffExists = await Staff.findOne({staffId : req.body.staffId});
        //console.log(staffExists);
        if(staffExists){
            return res.status(200).send({
                message: "Staff member already exists",
                success: false
            })
        }
        console.log(`Pwd: ${req.body.password} ${req.body.confirmPassword}`)
        if(req.body.password != req.body.confirmPassword){ 
            console.log(`${req.body.password} ${req.body.confirmPassword}`)
            return res.status(200).send({
                message: "Passwords didn't match!",
                success: false
            })
        }
        
        const salt = await brcypt.genSalt(10);
        const hashedPassword = await brcypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        

        const newStaffMember = new Staff(req.body);
        await newStaffMember.save();
        res.status(200).send({
            message: "Staff member registered successfully!\nPlease wait for admin approval!",
            success: true
        })
    }
    catch(error){
        res.status(500).send({
            message: error.message,
            success : false
        })
    }
})


//login for a staff member
router.post("/login", async(req,res)=>{
    try{
        //console.log(req.body);
        const member = await Staff.findOne({staffId : req.body.staffId});
        //console.log(`${member}`)
        const isMatch = await brcypt.compare(req.body.password , member.password);
        //console.log(`${member} ${isMatch}`);
    if(!member || !isMatch){
        return res.status(200).send({
            message: "Invalid details!",
            success: false
        })
    }

    if(member.isApproved == false){
        return res.status(200).send({
            message: "Please wait for admin approval!",
            success: false
        })
    }

    const token = jwt.sign({
        staffId : member._id},
        process.env.jwt_token,
        {expiresIn : "24h"}
    )
    res.status(200).send({
        message: "Login successful !",
        success: true,
        data : token
    })
    }
    catch(error){

    }
})

//get staff mem by id
router.post("/get-staffmem-by-id",authmiddleware, async(req,res)=>{
    try {
        const member = await Staff.findOne({
            _id : req.body.staffId
        });
        if(!member){
            return res.status(200).send({
                message: "Staff member not found",
                success: false
            })
        }
        member.password = undefined;
        res.status(200).send({
            message:"Staff member found",
            success: true,
            data: member
        })
    } catch (error) {
        
    }
}
)
module.exports = router;