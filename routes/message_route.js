const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Message=require('../modal/notificationModal')

router.post("/", async(req, res) => {


    const {messages}=req.body
    

  // Create a new User instance with the extracted data
  const newMessage = new Message(req.body);

  // Save the user to the database
  await newMessage.save()
    .then((course) => {
      console.log('Message Saved:', course);
      res.status(201).json({ message: 'Message saved successfully', course });
    })
    .catch((err) => {
      console.error('Error saving user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
    
});

router.get("/", async(req, res) => {


  Message.find().sort({ createdAt: -1 }).then(data => {
    console.log("dataa",data)
    res.status(200).json(
        data
    );
});
  
});

module.exports = router;