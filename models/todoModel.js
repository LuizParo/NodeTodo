var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = mongoose.model('Todos', new Schema({
    username : String,
    todo : String,
    isDone : Boolean,
    hasAttachment : Boolean
}));