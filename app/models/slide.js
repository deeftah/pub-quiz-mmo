var slideModel = require('../db').models.slide;

var create = function( data, callback ) {
    var newSlide = new slideModel(data);
    newSlide.save(callback);
}

var find = function (data, callback){
    slideModel.find(data, callback);
}

var findOne = function (data, callback){
	slideModel.findOne(data, callback);
}

var findById = function (id, callback){
	slideModel.findById(id, callback);
}

module.exports = {
    create,
    find,
    findOne,
    findById
};