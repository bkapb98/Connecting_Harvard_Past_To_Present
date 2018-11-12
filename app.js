const express = require('express');
const path = require('path');
const polyfill = require('cross-fetch/polyfill');
const sqlite3 = require('sqlite3');
const async = require('async');
const session = require('cookie-session')


const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;

// Authorizer route
function authChecker(req, res, next) {
  if (req.session.auth) {
      next();
  } else {
     res.redirect("/auth");
  }
}

// Initialize Express
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



// Create database
let db = new sqlite3.Database('PopulatingSQLDatabase/ConnectingPG.db', sqlite3.OPEN_READWRITE);

// List houses
// Implement in parallel instead: https://caolan.github.io/async/docs.html#parallel
room_numbers = []
app.get('/', (req, res) => {
  async.parallel({
    // Get room numbers
    rooms_info: function(callback) {
      db.all(`SELECT Name FROM Rooms`, (err, rooms_info) => {
        if(err) {
          return res.status(404)
            .render('404');
        }
        for(room in rooms_info)
        {
          room_numbers.push(room)
        }
        callback(null, room_numbers)
    })},
    // Get house information
    house_info: function(callback) {
      db.all('SELECT * FROM Houses', (err, house_info) => {
        if(err) {
          return res.status(404)
            .render('404');
        }
        callback(null, house_info)
      }
    )}
  },
  // Render home page
  function(err, results) {
    res.render('index', { houses: results.house_info, rooms: room_numbers });
  });
});


// House Page
app.get('/house/:houseId', (req, res) => {
  const house_id = req.params.houseId;
  async.parallel({
    // Get event information
    events_info: function(callback) {
      // Sorted per https://www.tutorialspoint.com/sql/sql-sorting-results.htm
      db.all(`SELECT * FROM Events WHERE houseId = ? ORDER BY DATE ASC`, house_id, (err, events_info) => {
        if(err) {
          return res.status(404)
            .render('404');
        }
        callback(null, events_info);
      })
    },
    // Get house information
    house_info: function(callback) {
      db.get(`SELECT * FROM Houses WHERE houseId = ?`, house_id, (err, house_info) => {
        if(err) {
          return res.status(404)
            .render('404');
        }
        callback(null, house_info);
      })
    },
    // Get room information
    rooms_info: function(callback) {
      db.all(`SELECT * FROM Rooms WHERE houseId = ?`, house_id, (err, rooms_info) => {
        if(err) {
          return res.status(404)
            .render('404');
        }
        callback(null, rooms_info);
      })
    }
  },
  function(err, results) {
    res.render('house', { house: results.house_info, rooms: results.rooms_info, events: results.events_info });
  });
});

// Room Page
app.get('/room/:roomId', (req, res) => {
  const room_id = req.params.roomId;
  async.parallel({
    // Get room info
    room_info: function(callback) {
      db.get(`SELECT * FROM Rooms WHERE roomId = ?`, room_id, (err, room_info) => {
        if(err) {
          return res.status(404)
            .render('404');
        }
        callback(null, room_info);
      })},
    // Get comments
    comments: function(callback) {
      db.all(`SELECT * FROM Comments WHERE roomId = ?`, room_id, (err, comments_info) => {
        if(err) {
          return res.status(404)
            .render('404');
        }
        callback(null, comments_info);
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
        return res.status(404)
            .render('404');
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
    let name = req.body.inputs;
    if (name.length <5)
      {
        db.get('SELECT roomId FROM Rooms WHERE name = ?', name, (err, room) => {
          if(room){
            res.redirect(`/room/${room.roomId}`);
          }
          else {
              return res.status(404)
                  .render('404');
          }
        });
}
  else{
      db.get('SELECT houseId FROM Houses WHERE name = ?', name, (err, house) => {
        if(house){
          res.redirect(`/house/${house.houseId}`);
        }
        else {
            return res.status(404)
                .render('404');
        }
      });
    }
  })

app.post('/commenthandler/:roomId', function(req, res){
  let text = req.body.comment;
  //waiting until we can keep track of the logged-in user's ID
  let userId = 20;
  let roomId = req.params.roomId;
  let time = Date.now();
  //adds the comment and its object ID to the overall list of comments
  db.run('INSERT INTO Comments(text, userId, roomId, time) VALUES(?, ?, ?, ?)', [text, userId, roomId, time]);
  //creates and concatenates a string for the redirect URL to go back to object page
  let address = '/room/';
  address+= req.params.roomId;
  //redirects to page for the individual object after adding comment for it
  res.redirect(address);
})

// Listen on socket
app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});
