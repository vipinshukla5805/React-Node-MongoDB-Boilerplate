// app/models/bear.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: Number,
    name: String
}, {
    collection: 'inventory'
});

module.exports = mongoose.model('inventory', UserSchema);