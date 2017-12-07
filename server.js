var express = require('express'); // for app server object and other middleware
var app = express(); // set up server on this object and will later pass this to the http to listen on
var server = require('http').createServer(app); // the actual server that listens on a port on server.listen(). We will need to pass server into socket.io

var bodyParser = require('body-parser'); // body parser allows us to access data submitted from the client THROUGH html FORMS
var path = require('path');

app.use(bodyParser.urlencoded({extended: true}));

app.use(function(request, response, nextMiddleware){
  console.log("Somebody came into our website. This middleware activates no matter what.");
  nextMiddleware();
});

var users = []

app.get('/', function(request, response){
  // request comes from the CLIENT. This is an object that contains details about what they're trying to do, or information you've logged on them.
  console.log("Somebody came to my website! They visited the root directory.");
  console.log(request.ip);
  response.sendFile(__dirname + '/index.html');
});
app.get('/elliot', function(request, response){
  // request comes from the CLIENT. This is an object that contains details about what they're trying to do, or information you've logged on them.
  console.log("Somebody came to my website! They visited the root directory.");
  console.log(request.ip);
  response.sendFile(__dirname + '/elliot.html');
});

app.get('/club', function(request, response){
  // request comes from the CLIENT. This is an object that contains details about what they're trying to do, or information you've logged on them.
  console.log("Somebody came to my club website!");
  console.log(request.ip);
  response.sendFile(__dirname + '/club.html');
});

app.get('/success', function(request, response){
  response.sendFile(__dirname + '/success.html');
});

app.get('/failure', function(request, response){
  response.sendFile(__dirname + '/failure.html');
});

app.post('/form', function(request, response){
  console.log(request.body);
  if(request.body.username == "admin" && request.body.password == "root"){
    response.redirect('/success');
  } else{
    response.redirect('/failure');
  }
});

app.post('/form-login', function(request, response){
  console.log(request.body);
  if(request.body.username == "nic" && request.body.password == "K"){
    response.redirect('/success');
  } else{
    response.redirect('/failure');
  }
});

app.post('/create-user', function(request, response){
  console.log(request.body);
  console.log(users);
  if(request.body.username && request.body.password){
    users.push({username: request.body.username, password: request.body.password})
    response.redirect('/success');
  } else{
    response.redirect('/');
  }
});
// This line at the bottom, activates the sever. All the lines above this should CONFIGURE the server
server.listen(8000, function() {
  console.log('listening on 8000')
});
