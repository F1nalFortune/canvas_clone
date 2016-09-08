var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var Assignment = new Schema({
  name: String,
  directions: String,
  courseId: String
});

module.exports = mongoose.model( 'Assignment', Assignment );