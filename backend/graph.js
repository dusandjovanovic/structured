var mongoose = require('mongoose');
var schema = mongoose.Schema;

var nodeSchema = new schema({
    id : Number,
    index : Number,
    linkCount : Number,
    vx : Number,
    vy : Number,
    x : Number,
    y : Number
});

var edgeSchema = new schema({
    index: Number,
    source: nodeSchema,
    target: nodeSchema
});
var graphSchema = new schema({
    edges : [edgeSchema],
    lastIndex: Number,
    nodes : [nodeSchema]
});
// var mainGraphSchema = new schema({
//     graph: graphSchema
// });
module.exports = mongoose.model('Graph', graphSchema);
