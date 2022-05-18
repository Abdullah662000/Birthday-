const mongoose = require("mongoose");
const schema = mongoose.Schema({
  id: String,
  name: String,
  date: String,
});
module.exports = mongoose.model("Friend", schema);
