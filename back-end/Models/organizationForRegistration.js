const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  applicantType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  uniqId: {
    type: String,
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  branchAddress: {
    type: String,
    required: true,
  },
  branchCity: {
    type: String,
    required: true,
  },
  branchState: {
    type: String,
    required: true,
  },
  branchTelephone: {
    type: String,
    required: true,
  },
  branchEmail: {
    type: String,
    required: true,
  },
  branchOwnerName: {
    type: String,
    required: true,
  },
  branchOwnerTelephone: {
    type: String,
    required: true,
  },
  branchOwnerPan: {
    type: String,
    required: true,
  },
  branchDocument: {
    type: String,
    required: true,
  },
  branchRegistrationNumber: {
    type: String,
    required: true,
  },
  branchRegistrationDate: {
    type: String,
    required: true,
  },
  branchLogo: {
    type: String,
    required: true,
  },
});

const Organization = mongoose.model(
  "org-registration-notifications",
  OrganizationSchema
);

module.exports = Organization;
