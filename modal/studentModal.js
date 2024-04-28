const mongoose = require("mongoose");
// const expSchema = new mongoose.Schema({
//     course_id:{
//         type: String
//     },
//     course_name:{
//         type: String
//     },
//     professor_name:{
//         type: String
//     },
//     department:{
//         typ: String
//     }
// })
const studentSchema = new mongoose.Schema({
    userType:{
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true

    },

    email: {
        type: String,
        required: true
     
    },

    password: {
        type: String,
        required: true,
    },

    department: {
        type: String,
        
    }
    ,
    applied_jobs:{
        type: Array,

    },
    availOffers:{
        type: Array,
    },
    selected:{
        type:Object
    }
}, { timestamps: true });

module.exports = mongoose.model("Applicant", studentSchema);