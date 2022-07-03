const mongoose = require('mongoose')

const rowSchema = new mongoose.Schema({
    rowName:{type:String, required:true},
    data:[]
},
{ collection: 'rows' });

const Row = mongoose.model('Row', rowSchema);

module.exports = Row;
