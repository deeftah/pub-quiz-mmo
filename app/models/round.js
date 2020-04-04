var roundModel = require('../db').models.round;

var create = function( data, callback ) {
    var newRound = new roundModel(data);
    newRound.save(callback);
}

var find = function (data, callback){
    roundModel.find(data, callback);
}

var findOne = function (data, callback){
	roundModel.findOne(data, callback);
}

var findById = function (id, callback){
	roundModel.findById(id, callback);
}

module.exports = {
    create,
    find,
    findOne,
    findById
}