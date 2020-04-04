var sessionModel = require('../db').models.session;

var create = function( data, callback ) {
    var newSession = new sessionModel(data);
    newSession.save(callback);
}

var find = function (data, callback){
    sessionModel.find(data, callback);
}

var findOne = function (data, callback){
	sessionModel.findOne(data, callback);
}

var findById = function (id, callback){
	sessionModel.findById(id, callback);
}

module.exports = {
    create,
    find,
    findOne,
    findById
}