var quizModel = require('../db').models.quiz;

var create = function( data, callback ) {
    var newQuiz = new quizModel(data);
    newQuiz.save(callback);
}

var find = function (data, callback){
    quizModel.find(data, callback);
}

var findOne = function (data, callback){
	quizModel.findOne(data, callback);
}

var findById = function (id, callback){
	quizModel.findById(id, callback);
}

module.exports = {
    create,
    find,
    findOne,
    findById
}