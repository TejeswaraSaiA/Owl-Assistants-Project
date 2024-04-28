const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Application = require('../modal/applicationModal')
const Applicant = require("../modal/studentModal")
const Course= require("../modal/courseModal")

router.post("/add_course", async(req, res) => {


    const {course_name,description,department,professor_name,applicants,ta_name,ta_selected}=req.body
    const course = req.body;

  // Create a new User instance with the extracted data
  const newCourse = new Course(course);

  // Save the user to the database
  await newCourse.save()
    .then((course) => {
      console.log('course saved:', course);
      res.status(201).json({ message: 'Course saved successfully', course });
    })
    .catch((err) => {
      console.error('Error saving user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
    
});

router.get("/get_courses", async(req, res) => {


  Course.find().sort({ createdAt: -1 }).then(data => {
    console.log("dataa",data)
    res.status(200).json(
        data
    );
});
  
});

router.post('/update_course',async(req,res)=>{
  const {course_id,todos}=req.body;
  let course=await Course.findById({_id:course_id})
  console.log("courses",todos)
  course.todos=todos
  await course.save();
  
})

module.exports = router;