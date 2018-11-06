const express = require('express');
//const expressVue = require('express-vue');
const path = require('path');
require('cross-fetch/polyfill');
const sqlite3 = require('sqlite3');
const async = require('async');
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const port = 3000;

// Initialize Express
const app = express();
// app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(express.staticProvider(__dirname + '/public'));


//importing and registering Vue component
//import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
//app.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

// Create database
let db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE);

// List houses
room_numbers = []
app.get('/', (req, res) => {
  db.all(`SELECT Name FROM Rooms`, (err, rooms_info) => {
    if(err) {
      return console.error(err.message);
    }
    for(room in rooms_info)
    {
      room_numbers.push(room)
    }
    console.log("room info:", room_numbers);
    db.all('SELECT * FROM Houses', (err, house_info) => {
        if(err) {
          return console.error(err.message);
        }
        console.log("house info:", house_info);
        // Render home page
        res.render('index', { houses: house_info, rooms: room_numbers });
      });
    });
});


// House Page
app.get('/house/:houseId', (req, res) => {
  const house_id = req.params.houseId;
  //implement in parallel instead: https://caolan.github.io/async/docs.html#parallel

  async.parallel({
    events_info: function(callback) {
      db.all(`SELECT * FROM Events WHERE houseId = ?`, house_id, (err, events_info) => {
        if(err) {
          return console.error(err.message);
        }
      setTimeout(function() {
          callback(null, events_info);
      }, 300);
    })},
    house_info: function(callback) {
      db.get(`SELECT * FROM Houses WHERE houseId = ?`, house_id, (err, house_info) => {
        if(err) {
          return console.error(err.message);
        }
      setTimeout(function() {
          callback(null, house_info);
      }, 300);
    })},
    rooms_info: function(callback) {
      db.all(`SELECT * FROM Rooms WHERE houseId = ?`, house_id, (err, rooms_info) => {
        if(err) {
          return console.error(err.message);
        }
      setTimeout(function() {
          callback(null, rooms_info);
      }, 300);
    })}
  },
  // optional callback
  function(err, results) {
    res.render('house', { house: results.house_info, rooms: results.rooms_info, events: results.events_info });
  });
});

// Room Page
app.get('/room/:roomId', (req, res) => {
    const room_id = req.params.roomId;
    db.get(`SELECT * FROM Rooms WHERE roomId = ?`, room_id, (err, room_info) => {
      if(err) {
        return console.error(err.message);
      }
      console.log("room info:", room_info);
      // Render room page
      res.render('room_featured', { room: room_info });
    });
  });

  app.get('/login', (req, res) => {
    res.render('login.ejs');
  });

  app.post('/login', (req, res) => {
    // to do authenticate account and redirect
    console.log('To do')
  })

app.post('/roomhandler', function(req, res){
  // let address = '/room/';
  // let id = 0;
  let name = req.body.inputs;
  db.get('SELECT roomId FROM Rooms WHERE Name = ?', name, (err, room) => {
    if(err){
      return console.error(err.message);
    }
    res.redirect(`/room/${room.roomId}`);
  });

})


// Listen on socket
app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});
