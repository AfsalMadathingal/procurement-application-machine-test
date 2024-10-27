const mongoose = require("mongoose");
const { getNames } = require("country-list");

const countryNames = getNames();

const supplierSchema = new mongoose.Schema({
  supplierNo: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  taxNo: { type: String, required: true },
  country: {
    type: String,
    required: true,
    validate: {
      validator: (value) => countryNames.includes(value),
      message: (props) => `${props.value} is not a valid country`,
    },
  },
  mobileNo: { type: String, required: true },
  email: { type: String, required: true },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive", "Blocked"],
  },
});

module.exports = mongoose.model("Supplier", supplierSchema);
