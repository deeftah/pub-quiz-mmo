var sessionModel = require('../db').models.session;

var create = function( data, callback ) {
    var newSession = new sessionModel(data);
    newSession.save(callback);
}

var findOne = function (data, callback){
	sessionModel.findOne(data, callback);
}

var findById = function (id, callback){
	sessionModel.findById(id, callback);
}

module.exports = {
    create,
    findOne,
    findById
}