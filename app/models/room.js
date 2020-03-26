var roomModel = require('../db').models.room;

var create = function( data, callback ) {
    var newRoom = new roomModel(data);
    newRoom.save(callback);
}

module.exports = {
    create
}