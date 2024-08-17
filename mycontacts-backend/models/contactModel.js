// Schema model
const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the name of Person's Contact"]
    },
    email: {
        type: String,
        required: [true, "Please add the email address of Contact"]
    },
    phone: {
        type: String,
        required: [true, "Please add the phone number of Contact"]
    },
    createdAt1: {
        type: String,
        // default: Date.now,
        // required: [false]
    },
    // updatedAt1: {
    //     type: String,
    //     // default: Date.now,
    //     // required: [false]
    // }
},
{
    timestamps: true,
});


module.exports = mongoose.model("Contact", contactSchema);