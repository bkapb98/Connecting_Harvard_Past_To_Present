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


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



// Create database
let db = new sqlite3.Database('PopulatingSQLDatabase/ConnectingPG.db', sqlite3.OPEN_READWRITE);


// List houses

room_numbers = []
app.get('/', (req, res) => {
  async.parallel({
    rooms_info: function(callback) {
      db.all(`SELECT Name FROM Rooms`, (err, rooms_info) => {
        if(err) {
          res.render('404');
        }
        for(room in rooms_info)
        {
          room_numbers.push(room)
        }
        setTimeout(function() {
          callback(null, room_numbers);
        }, 100);
        // console.log("room info:", room_numbers);
    })},
    house_info: function(callback) {
      db.all('SELECT * FROM Houses', (err, house_info) => {
        if(err) {
          res.render('404');
        }
        setTimeout(function() {
          callback(null, house_info);
        }, 200);
      })}
        // console.log("house info:", house_info);

      },
      //  callback
  // Render home page
  function(err, results) {
    res.render('index', { houses: results.house_info, rooms: room_numbers });
  });
});


// House Page
app.get('/house/:houseId', (req, res) => {
  const house_id = req.params.houseId;
  //implement in parallel instead: https://caolan.github.io/async/docs.html#parallel

  async.parallel({
    events_info: function(callback) {
      // sorted per https://www.tutorialspoint.com/sql/sql-sorting-results.htm
      db.all(`SELECT * FROM Events WHERE houseId = ? ORDER BY DATE ASC`, house_id, (err, events_info) => {
        if(err) {
          res.render('404');
        }
      setTimeout(function() {
          callback(null, events_info);
      }, 100);
    })},
    house_info: function(callback) {
      db.get(`SELECT * FROM Houses WHERE houseId = ?`, house_id, (err, house_info) => {
        if(err) {
          res.render('404');
        }
      setTimeout(function() {
          callback(null, house_info);
      }, 200);
    })},
    rooms_info: function(callback) {
      db.all(`SELECT * FROM Rooms WHERE houseId = ?`, house_id, (err, rooms_info) => {
        if(err) {
          res.render('404');
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
          res.render('404');
        }
        setTimeout(function() {
          callback(null, room_info);
        }, 100);
      })},
    comments: function(callback) {
      db.all(`SELECT * FROM Comments WHERE roomId = ?`, room_id, (err, comments_info) => {
        if(err) {
          res.render('404');
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
    const username = req.body.username;
    const password = req.body.password;
      db.get(`SELECT * FROM Users WHERE userName = '${username}' AND password = '${password}'`, (err, result) => {
      if (err) {
        throw err
      }
      console.log(result)
      console.log('username', result.userName);
      if (!result) {
        console.log("login combo doesn't exist")
      }
      if (result.userName === username && result.password == password){
        console.log("person logged in")
        // to do - figure out how to show authenticated probably in header
        res.redirect('/');
      }
      else {
        res.redirect('/login')
      }
  });
  });

  app.get('/register', (req, res) => {
    res.render('register.ejs');
  });

  app.post('/register', (req, res) => {
    // need to get info from form using dom
    const first = req.body.firstname;
    const last = req.body.lastname;
    const userName = req.body.username;
    const password = req.body.password;
    db.run('INSERT INTO Users(firstName, lastName, userName, password) VALUES(?, ?, ?, ?)', [first, last, userName, password]);
    console.log('added user')
    res.redirect('/')
  })

  app.post('/roomhandler', function(req, res){
    // let address = '/room/';
    // let id = 0;
    let name = req.body.inputs;
    if (name.length <5)
    {
    db.get('SELECT roomId FROM Rooms WHERE Name = ?', name, (err, room) => {
      if(err){
        return console.error(err.message);
      }
      res.redirect(`/room/${room.roomId}`);
    });
  }
  else{
    db.get('SELECT houseId FROM Houses WHERE name = ?', name, (err, house) => {
      if(err){
        return console.error(err.message);
      }
      res.redirect(`/house/${house.houseId}`);
    });
  }})


// Listen on socket
app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});
