
/**
 * Module dependencies.
 */

var express = require('express');
var missions = require('./routes/missions');
var http = require('http');
var path = require('path');
var app = express();

var endpoints = require('./endpoints');

app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('bikecheck'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var controllers = require('./controllers');
// Routes - Controllers
app.get(endpoints.bikestormers.all, controllers.bikestormers.get);
app.get(endpoints.locations.all, controllers.locations.get);
app.get(endpoints.locations.test, controllers.locations.test);

app.post(endpoints.missions.bikecheck, controllers.bikechecks.save);
app.get(endpoints.missions.bikecheck, controllers.bikechecks.get);
//app.post(endpoints.bikestormers.all, controllers.bikestormers.post);

/* 
 * Deprecated
 *
app.get('/', routes.index);
app.get('/users/:id', user.find);
app.get('/missions', missions.list);
app.get('/missions/:id', missions.mission);
app.get('/foursquare', foursquare.login);
app.get('/users/:id/bikecheck', foursquare.checkins);
app.get('/near', foursquare.near);

app.post('/users/:id/bikecheck', foursquare.bikecheck);
*/


// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bicidb');
var db = mongoose.connection;

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});