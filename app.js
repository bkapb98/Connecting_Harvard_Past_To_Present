const express = require('express');
//const expressVue = require('express-vue');
const path = require('path');
require('cross-fetch/polyfill');
const sqlite3 = require('sqlite3');
const async = require('async');

const hostname = '127.0.0.1';
const port = 3000;

// Initialize Express
const app = express();
// app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.use(express.staticProvider(__dirname + '/public'));


//importing and registering Vue component
//import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
//app.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

// Create database
let db = new sqlite3.Database('/Users/elizascharfstein/Documents/Junior/CS100/finalProject/connecting/PopulatingSQLDatabase/ConnectingPG.db', sqlite3.OPEN_READWRITE);

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
      }, 100);
    })},
    house_info: function(callback) {
      db.get(`SELECT * FROM Houses WHERE houseId = ?`, house_id, (err, house_info) => {
        if(err) {
          return console.error(err.message); 
        }
      setTimeout(function() {
          callback(null, house_info);
      }, 200);
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
  //  callback
  function(err, results) {
    res.render('house', { house: results.house_info, rooms: results.rooms_info, events: results.events_info });
  });
});

// Room Page
app.get('/room/:roomId', (req, res) => {
  const room_id = req.params.roomId;
  async.parallel({
    room_info: function(callback) {
      db.get(`SELECT * FROM Rooms WHERE roomId = ?`, room_id, (err, room_info) => {
        if(err) {
          return console.error(err.message);
        }
        setTimeout(function() {
          callback(null, room_info);
        }, 100);
      })},
    comments: function(callback) {
      db.all(`SELECT * FROM Comments WHERE roomId = ?`, room_id, (err, comments_info) => {
        if(err) {
          return console.error(err.message);
        }
        setTimeout(function() {
          callback(null, comments_info);
        }, 200);
      })}
    },
    // Render room page
    function(err, results) {
      res.render('room_featured', { room: results.room_info, comments: results.comments});
    });
  });

  app.get('/login', (req, res) => {
    res.render('login.ejs');
  });

  app.post('/login', (req, res) => {
    // to do authenticate account and redirect
    console.log('To do')
  })


// Listen on socket
app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});
