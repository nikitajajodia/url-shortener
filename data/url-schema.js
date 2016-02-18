var mongoose = require("mongoose")

// Create a new schema for our url data
var schema = new mongoose.Schema({
  longUrl : String,
  code    : String
});

module.exports = mongoose.model('urls', schema);