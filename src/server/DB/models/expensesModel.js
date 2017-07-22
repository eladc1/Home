var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//build Schema of the document (AKA table)
    //inserted    : { type : Date, default: Date.now },
var expensesSchema = new Schema({
    inserted    : Date,
    Date        : Date,
    category    : String,
    store       : String,
    what        : String,
    how_much    : Number,
    who         : String,
    how         : String,
    constant    : Boolean   
});

//modal take 2 parameters, document name, and the schema
module.exports = mongoose.model('expenses', expensesSchema);