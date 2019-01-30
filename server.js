const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Base = require('clay-base-sdk');
const moment = require('moment');

Base.init(process.env.BASE_TOKEN)

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --------------------------------------------

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// --------------------------------------------

app.post('/submit', function(request, response){
  
  var body = {
    age: request.body.age || "No Answer",
    surveillance: request.body.surveillance || "No Answer",
    selfcensor: request.body.selfcensor || "No Answer",
    date: moment().format(),
    tech: request.body.tech || "No Answer"
  }
  
  Base.data.insert( body );

  response.sendFile(__dirname + '/views/thanks.html');

});

app.get('/submit', function(request, response){
  response.redirect('/');
});

// --------------------------------------------

const listener = app.listen(process.env.PORT, function() {
  console.log('Listening on port ' + listener.address().port);
});
