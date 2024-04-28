const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    messages: {
        type: String,

    }
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);