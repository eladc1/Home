var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//build Schema of the document (AKA table)
var IncomeSchema = new Schema({
    inserted: { type: Date, default: Date.now },
    date: Date,
    type: String,
    what: String,
    name: String,
    who: String,
    how_much: Number,
    how: String,
    part: Number,
    sum_part: Number,
    constant: { type: Boolean, default: false },
});

//modal take 2 parameters, document name, and the schema
module.exports = mongoose.model('income', IncomeSchema);