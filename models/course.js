var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var Course = new Schema({
  teacher: String,
  title: String,
  date: String
});

module.exports = mongoose.model( 'Course', Course );
