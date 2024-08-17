// we are gonna use mongoose for the project
// so whenever we interact with mongodb we always
// get a promise so in order to resolve that promise
// we use async and try catch methods
const asyncHandler = require("express-async-handler");
const moment = require("moment-timezone");
const Contact = require("../models/contactModel");

// .then(results => {
//     console.log(results);  // Process the results here
// })
// .catch(err => {
//     console.error(err);  // Handle any errors here
// });

//@desc get all Contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json({ message: "Get all contacts", contacts });
});

//@desc Create contacts
//@route POST /api/contacts
//@access public
// 201 - resource created
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  
  const createdAtIST = moment.tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss").toString();
  console.log(createdAtIST)
  const contact = await Contact.create({
    name,
    email,
    phone,
    createdAt1: createdAtIST
  })
  res.status(201).json({
    message: "Contact created",
    contact
  });
});
//@desc update contact for required id
//@route PUT /api/contacts
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
});

//@desc delete contact for a particular id
//@route DELETE /api/contacts
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ message: `Delete contact for ${contact.name}`, contact });
});

//@desc get Contact for a particular id
//@route GET /api/contacts
//@access public
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res
    .status(200)
    .json({ message: `Get contact for ${req.params.id}`, contact });
});

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContactById,
};
