const express = require('express');
const path = require('path');
const polyfill = require('cross-fetch/polyfill');
const sqlite3 = require('sqlite3');
const async = require('async');
const session = require('express-session');


const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;

// authorizer middleware
authChecker = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
      next();
  }
}

// Initialize Express
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(session({
  secret: 'ssshhhhh',
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Create database
const db = new sqlite3.Database('PopulatingSQLDatabase/ConnectingPG.db', sqlite3.OPEN_READWRITE);

// List houses
// Implement in parallel instead: https://caolan.github.io/async/docs.html#parallel
room_numbers = []

app.get('/', (req, res) => {
  async.parallel({
    // Get room numbers
    rooms_info: function(callback) {
      db.all(`SELECT Rooms.name, Rooms.id, Houses.name AS houseName FROM Rooms LEFT JOIN Houses ON Rooms.houseId = Houses.id`, (err, rooms_info) => {
        if(err) {
          return res.status(404)
            .render('404', {err_message: "Sorry, you have reached an error" } );
        }
        callback(null, rooms_info)
    })},
    house_info: function(callback) {
      db.all('SELECT * FROM Houses', (err, house_info) => {
        if(err) {
          return res.status(404)
            .render('404', {err_message: "Sorry, you have reached an error" } );
        }
        callback(null, house_info)
      }
    )}
  },
  // Render home page
  function(err, results) {
    console.log('TODO', results.rooms_info)
    res.render('index', { houses: results.house_info, rooms: results.rooms_info });
  });
});


// House Page
app.get('/house/:houseId', authChecker, (req, res) => {
  const house_id = req.params.houseId;
  async.parallel({
    // Get event information
    events_info: function(callback) {
      // Sorted per https://www.tutorialspoint.com/sql/sql-sorting-results.htm
      db.all(`SELECT * FROM Events WHERE houseId = ? ORDER BY DATE ASC`, house_id, (err, events_info) => {
        if(err) {
          return res.status(404)
            .render('404', {err_message: "Sorry, you have reached an error" });
        }
        callback(null, events_info);
      })
    },
    // Get house information
    house_info: function(callback) {
      db.get(`SELECT * FROM Houses WHERE id = ?`, house_id, (err, house_info) => {
        if(err) {
          return res.status(404)
            .render('404', {err_message: "Sorry, you have reached an error" });
        }
        callback(null, house_info);
      })
    },
    // Get room information
    rooms_info: function(callback) {
      db.all(`SELECT * FROM Rooms WHERE houseId = ?`, house_id, (err, rooms_info) => {
        if(err) {
          return res.status(404)
            .render('404', {err_message: "Sorry, you have reached an error" });
        }
        callback(null, rooms_info);
      })
    }
  },
  function(err, results) {
    const house = results.house_info; 
    const houseName = house.name; 
    // Search Hollis for house
    const url = `http://api.lib.harvard.edu/v2/items.json?title=${houseName}+house`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      res.render('house', { house: results.house_info, rooms: results.rooms_info, events: results.events_info, resources: data.items.mods});
    });
  });
});

// Room Page
app.get('/room/:roomId', (req, res) => {
  const room_id = req.params.roomId;
  async.parallel({
    // Get room info
    room_info: function(callback) {
      db.get(`SELECT * FROM Rooms WHERE id = ?`, room_id, (err, room_info) => {
        if(err) {
          return res.status(404)
            .render('404', {err_message: "Sorry, you have reached an error"});
        }
        callback(null, room_info);
      })},
    // Get comments
    comments: function(callback) {
      db.all(`SELECT * FROM Comments WHERE roomId = ?`, room_id, (err, comments_info) => {
        if(err) {
          return res.status(404)
            .render('404', {err_message: "Sorry, you have reached an error"});
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
    console.log(result, err)
      if (err) {
      return res.status(404)
          .render('404', {err_message: "It looks like you have no registered account per those credentials." });
    }
    if (!result) {
      return res.status(404)
          .render('404', {err_message: "It looks like you have no registered account per those credentials." });
    }
    if (result.userName === username && result.password === password){
      req.session.user = {username};
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
    const first = req.body.firstname;
    const last = req.body.lastname;
    const userName = req.body.username;
    const password = req.body.password;
    if (!first || !last || !userName || !password) {
      return res.status(404)
        .render('404', {err_message: "Sorry, you have reached an error" });
    }
    db.get(`SELECT * FROM Users WHERE userName = '${userName}'`, (err, result) => {
      if (err) {
        return res.status(404)
            .render('404', {err_message: "Sorry, you have reached an error" });
      }
      if (result) {
        return res.status(404)
            .render('404', {err_message: "Sorry, this username already exists." });
      }
      db.run('INSERT INTO Users(firstName, lastName, userName, password) VALUES(?, ?, ?, ?)', [first, last, userName, password]);
      sess = req.session;
      sess.user = userName;
      res.redirect('/')
    });
    // db.run('INSERT INTO Users(firstName, lastName, userName, password) VALUES(?, ?, ?, ?)', [first, last, userName, password]);
    // sess = req.session;
    // sess.user = userName;
    // res.redirect('/')
  })

  const CHAR_0 = '0'.charCodeAt(0);
  const CHAR_9 = '9'.charCodeAt(0);

  function containsDigit (s) {
    return [...s].some(x => {
      const c = x.charCodeAt(0);
      return c >= CHAR_0 && c <= CHAR_9;
    });
  }

  app.post('/roomhandler', function(req, res){
    const name = req.body.inputs;
    console.log(containsDigit(name));
    if (containsDigit(name))
      {
        name = name.slice(-3);
        db.get('SELECT id FROM Rooms WHERE name = ?', name, (err, room) => {
          if(room){
            res.redirect(`/room/${room.id}`);
          }
          else {
              return res.status(404)
                  .render('404', {err_message: "Sorry, no matching results." });
          }
        });
}
  else{
      db.get('SELECT id FROM Houses WHERE name = ?', name, (err, house) => {
        if(house){
          res.redirect(`/house/${house.id}`);
        }
        else {
            return res.status(404)
                .render('404', {err_message: "Sorry, no matching results" });
        }
      });
    }
  })

app.post('/commenthandler/:roomId', function(req, res){
  const text = req.body.comment;
  const userId = 20;
  const roomId = req.params.roomId;
  const time = Date.now();
  // Adds the comment and its object ID to the overall list of comments
  db.run('INSERT INTO Comments(text, userId, roomId, time) VALUES(?, ?, ?, ?)', [text, userId, roomId, time]);
  // Creates and concatenates a string for the redirect URL to go back to object page
  //Callback function will be necessary to add and checking for errors
  // Redirects to page for the individual object after adding comment for it
  res.redirect(`/room/${roomId}`);
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  })

// Listen on socket
app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});
