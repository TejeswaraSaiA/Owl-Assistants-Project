const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Application = require('../modal/applicationModal')
const Applicant = require("../modal/studentModal")
const Course= require("../modal/courseModal")

router.post("/register", async(req, res) => {
    const student = req.body;

  // Create a new User instance with the extracted data
  const newStudent = new Applicant(student);

  // Save the user to the database
  await newStudent.save()
    .then((student) => {
      console.log('course saved:', student);
      res.status(201).json({ message: 'Course saved successfully', student });
    })
    .catch((err) => {
      console.error('Error saving user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
    
});

router.post("/signin", (req, res) => {

    const { id, password,userType } = req.body;
    console.log("my req bodayy",req.body)
    if (!id|| !password) {
        return res.status(422).json({ error: "please add roll_no amd password" });
    }
    Applicant.findOne({ email: id,password:password,userType:userType }).then((savedUser) => {
            if (!savedUser) {
              console.log("NO EMAIL AND PASSWORD")

                return res.status(422).json({ error: "Invalid roll_no or password" });
            }
            console.log("Login Successful",savedUser)
                    res.status(200).json(savedUser);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/getUser",(req,res)=>{
  console.log("paramss",req.params)
})

module.exports = router;