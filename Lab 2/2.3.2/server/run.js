var api = require('./api.js').app;
var users = require('./users.json');

/*api.use(bodyParser.json());*/

api.get('/', function(request, response) {
  response.json("node.js backend");
});

api.get('/users', function(request, response) {
  response.json(users);
});

api.put('/users', function(request, response) {
  users[users.length] = request.body;
  response.json('User was saved succesfully');
});

api.post('/users', function(request, response) {
  var newUser = request.body;
  
  if (!newUser.name || !newUser.city) {
    response.status(400).json('User must have a name and a city');
  } else {
    users.push(newUser);
    response.status(201).json('User was added successfully');
  }
});


api.delete('/users/:index', function(request, response) {
  const index = parseInt(request.params.index);

  if(indev >= 0 && index < users.length){
  users.splice(request.params.index, 1);
  response.json('User with index ' + request.params.index + ' was deleted');
  } else {
    response.status(404).json('user with index'+index+'not found');
  }

});

api.listen(3000, function(){
  console.log('CORS-enabled web server is listening on port 3000...');
});