var roomModel = require('../db').models.room;

var create = function( data, callback ) {
    var newRoom = new roomModel(data);
    newRoom.save(callback);
}

var findOne = function (data, callback){
	roomModel.findOne(data, callback);
}

var findById = function (id, callback){
	roomModel.findById(id, callback);
}

module.exports = {
    create,
    findOne,
    findById
}