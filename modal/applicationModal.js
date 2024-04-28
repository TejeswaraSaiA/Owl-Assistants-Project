const mongoose = require("mongoose");

const expSchema = new mongoose.Schema({
    course_name: {
        type: String
    },
    professor_name: {
        type: String
    },
    department: {
        typ: String
    }
})

const applicationSchema = new mongoose.Schema({
    course_name: {
        type: String,

    },
    course_id: {
        type: String,
        required: true

    },
    gpa: {
        type: String,

    },
    previous_experience: [expSchema],
    applicant_id: {
        type: String,
        required: true,

    },
    department: {
        type: String,
    },
    description: {
        type: String
    },
    professor_name: {
        type: String
    },
    applicant_name: {
        type: String
    },

    short_listed: {
        type: Boolean,
        default: false
    },
    admin_selected: {
        type: Boolean,
        default: false
    },
    committee_selected: {
        type: Boolean,
        default: false
    },
    offer_accepted: {
        type: Boolean,
        default: false
    },
    resume:{
        type:String,
    }

}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);