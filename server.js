var express = require('express');
var app = express();

var routes = require('./app/routes');
var sockets = require('./app/sockets')(app);

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use('/', routes);
app.use(express.static('public'));

sockets.listen(3000);