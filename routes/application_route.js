
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Application = require('../modal/applicationModal')
const Applicant = require("../modal/studentModal")
const Course= require("../modal/courseModal")

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post("/new_application",upload.single('resume'), async(req, res) => {
    const fileName = req.file && req.file.filename;
    const {course_name,course_id,gpa,previous_experience,applicant_id,department,professor_name,applicant_name}=req.body
    const application = req.body;
    application.resume= req.file && req.file.filename;
    application.previous_experience=JSON.parse(previous_experience)
    console.log("data",application)

  // Create a new User instance with the extracted data
  const newApplication = new Application(application);

  // Save the user to the database
  await newApplication.save()
    .then((user) => {
      console.log('User saved:', user);
      res.status(201).json({ message: 'User saved successfully', user });
    })
    .catch((err) => {
      console.error('Error saving user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
    const applicant=await Applicant.findOne({_id:applicant_id})
    const course= await Course.findOne({_id:course_id})
    applicant.applied_jobs=[...applicant.applied_jobs,{course_name:course_name,description:course.description,professor_name:professor_name}]
    course.applicants=[...course.applicants,applicant_id]
    await course.save();
    await applicant.save();

});

router.post("/applicant_update",async(req,res)=>{
    const {course_name,course_id,gpa,previous_experience,applicant_id,department,professor_name,applicant_name,short_listed,admin_selected,committee_selected,offer_accepted}=req.body
    let myData=req.body;
    //myData.short_listed=true
      myData.offer_accepted=true
      const applicant=await Applicant.findOne({_id:applicant_id})
      applicant.selected=true
      const course=await Course.findOne({_id:course_id})
      console.log("admin selected",admin_selected,committee_selected)
      
      if(committee_selected){
        course.ta_selected=true
        myData.short_listed=true
        myData.ta_selected=true
        console.log("mydataaa",myData)
      }

      course.ta_name=applicant_id
      console.log("ta name",course.ta_name)
      await course.save()
      await applicant.save()
      console.log("myDataaa",myData);
    await Application.updateOne({ _id: req.body._id }, {...myData})
        .then((data) => {
          console.log("daaaa",data)
          res.json(data)}
        )
        .catch((e) => res.status(400).json({ error: e.message }));

})

router.get("/application", (req, res) => {

    Application.find({ _id: req.user._id })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/allApplications", (req, res) => {
  console.log("Insidee here")
  try{
    Application.find().sort({ createdAt: -1 }).then(data => {
        res.status(200).json(
            data
        );
    });
  }
  catch(e){
    console.log(e)
  }
});





module.exports = router;