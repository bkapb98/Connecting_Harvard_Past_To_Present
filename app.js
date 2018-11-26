const express = require('express');
const path = require('path');
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
          return res.status(500)
            .render('error', {err_message: "Sorry, you have reached an error", user: req.session.user  } );
        }
        callback(null, rooms_info)
    })},
    house_info: function(callback) {
      db.all('SELECT * FROM Houses', (err, house_info) => {
        if(err) {
          return res.status(500)
            .render('error', {err_message: "Sorry, you have reached an error", user: req.session.user  } );
        }
        callback(null, house_info)
      }
    )}
  },
  // Render home page
  function(err, results) {
    res.render('index', { houses: results.house_info, rooms: results.rooms_info, user: req.session.user });
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
          return res.status(500)
            .render('error', {err_message: "Sorry, you have reached an error", user: req.session.user  });
        }
        callback(null, events_info);
      })
    },
    // Get house information
    house_info: function(callback) {
      db.get(`SELECT * FROM Houses WHERE id = ?`, house_id, (err, house_info) => {
        if(err) {
          return res.status(500)
            .render('error', {err_message: "Sorry, you have reached an error", user: req.session.user  });
        }
        callback(null, house_info);
      })
    },
    fRoom_info: function(callback) {
      db.all(`SELECT * FROM featuredRoom WHERE houseId = ?`, house_id, (err, house_info) => {
        if(err) {
          return res.status(500)
            .render('error', {err_message: "Sorry, you have reached an error", user: req.session.user  });
        }
        callback(null, house_info);
      })
    },
    // Get room information
    rooms_info: function(callback) {
      db.all(`SELECT * FROM Rooms WHERE houseId = ? ORDER BY LENGTH(Name), Name ASC`, house_id, (err, rooms_info) => {
        if(err) {
          return res.status(500)
            .render('error', {err_message: "Sorry, you have reached an error", user: req.session.user  });
        }
        callback(null, rooms_info);
      })
    }
  },
  function(err, results) {
    // change to houseInfo
    const house = results.house_info;
    const houseName = house.name;
    // Search Hollis for house
    const url = `http://api.lib.harvard.edu/v2/items.json?title=${houseName}+house`
    fetch(url)
    .then(response => response.json())
    // clean up variable names - froominfo
    .then(data => {
      res.render('house', { house: results.house_info,
                            rooms: results.rooms_info,
                            events: results.events_info,
                            featuredRooms: results.fRoom_info,
                            resources: data.items.mods,
                            user: req.session.user });
    });
  });
});

// Room Page
app.get('/room/:roomId', (req, res) => {
  let room_id = req.params.roomId;
  async.parallel({
    // Get room info
    room_info: function(callback) {
      db.get(`SELECT * FROM Rooms WHERE id = ?`, room_id, (err, room_info) => {
        if(err) {
          return res.status(500)
            .render('error', {err_message: "Sorry, you have reached an error", user: req.session.user });
        }
        callback(null, room_info);
      })},
    // Get comments
    comments: function(callback) {
      db.all(`SELECT * FROM Comments WHERE roomId = ?`, room_id, (err, comments_info) => {
        if(err) {
          return res.status(500)
            .render('error', {err_message: "Sorry, you have reached an error", user: req.session.user });
        }
        callback(null, comments_info);
      })}
    },
    // Render room page
    function(err, results) {
      res.render('room', { room: results.room_info, comments: results.comments, user: req.session.user });
    });
  });

  // Featured Room Page
  app.get('/featuredRoom/:roomId', (req, res) => {
    let room_id = req.params.roomId;
    db.get(`SELECT * FROM featuredRoom WHERE id = ?`, room_id, (err, room_info) => {
      // consistent space- node.js linter- spacing
      if (err) {
        return res.status(500)
          .render('error', { err_message: "Sorry, you have reached an error1", user: req.session.user });
      }
        res.render('room_featured', { room: room_info, user: req.session.user });

      });
    });

  app.get('/login', (req, res) => {
    res.render('login.ejs', { user: req.session.user });
  });

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
    db.get(`SELECT * FROM Users WHERE userName = ? AND password = ?`, username, password, (err, result) => {
      if (err) {
      return res.status(500)
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          .render('error', {err_message: "It looks like you have no registered account per those credentials.", user: req.session.user  });
    }
    if (!result) {
      return res.status(404)
          .render('error', {err_message: "It looks like you have no registered account per those credentials.", user: req.session.user  });
=======
=======
>>>>>>> Stashed changes
          .render('404', {err_message: "It looks like you have no registered account per those credentials.", session: req.session.user  });
    }
    if (!result) {
      return res.status(500)
          .render('404', {err_message: "It looks like you have no registered account per those credentials.", session: req.session.user  });
>>>>>>> Stashed changes
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
    res.render('register.ejs', { user: req.session.user });
  });

  app.post('/register', (req, res) => {
    const first = req.body.firstname;
    const last = req.body.lastname;
    const userName = req.body.username;
    const password = req.body.password;
      db.run('INSERT INTO Users(firstName, lastName, userName, password) VALUES(?, ?, ?, ?)', [first, last, userName, password], (err, result) => {
        if (err) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          return res.status(404)
            .render('error', {err_message: "Sorry, that username is taken." });
=======
          return res.status(500)
            .render('500', {err_message: "Sorry, that username is taken." });
>>>>>>> Stashed changes
=======
          return res.status(500)
            .render('500', {err_message: "Sorry, that username is taken." });
>>>>>>> Stashed changes
        }
        req.session.user = {userName};
        res.redirect('/')
      });
    });

  const CHAR_0 = '0'.charCodeAt(0);
  const CHAR_9 = '9'.charCodeAt(0);

  function containsDigit (s) {
    return [...s].some(x => {
      const c = x.charCodeAt(0);
      return c >= CHAR_0 && c <= CHAR_9;
    });
  }

  app.post('/roomhandler', function(req, res){
    let name = req.body.inputs;
    if (containsDigit(name))
      {
        name = name.slice(-3);
        db.get('SELECT id FROM Rooms WHERE name = ?', name, (err, room) => {
          if(err) {
            return res.status(500)
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              .render('error', {err_message: "Sorry, you have reached an error" });
=======
              .render('500', {err_message: "Sorry, you have reached an error" });
>>>>>>> Stashed changes
=======
              .render('500', {err_message: "Sorry, you have reached an error" });
>>>>>>> Stashed changes
          }
          if(room){
            res.redirect(`/room/${room.id}`);
          }
          else {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              return res.status(404)
                  .render('error', {err_message: "Sorry, no matching results.", user: req.session.user  });
=======
              return res.status(500)
                  .render('500', {err_message: "Sorry, no matching results.", session: req.session.user  });
>>>>>>> Stashed changes
=======
              return res.status(500)
                  .render('500', {err_message: "Sorry, no matching results.", session: req.session.user  });
>>>>>>> Stashed changes
          }
        });
      }
    else {
      db.get('SELECT id FROM Houses WHERE name = ?', name, (err, house) => {
        if(err){
          return res.status(500)
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              .render('error', {err_message: "Sorry, you have reached an error." });
=======
              .render('500', {err_message: "Sorry, you have reached an error." });
>>>>>>> Stashed changes
=======
              .render('500', {err_message: "Sorry, you have reached an error." });
>>>>>>> Stashed changes
        }
        if(house){
          res.redirect(`/house/${house.id}`);
        }
        else {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            return res.status(404)
                .render('error', {err_message: "Sorry, no matching results", user: req.session.user  });
=======
            return res.status(500)
                .render('500', {err_message: "Sorry, no matching results", session: req.session.user  });
>>>>>>> Stashed changes
=======
            return res.status(500)
                .render('500', {err_message: "Sorry, no matching results", session: req.session.user  });
>>>>>>> Stashed changes
        }
      });
    }
  })

app.post('/commenthandler/:roomId', authChecker, function(req, res){
  const text = req.body.comment;
  const userId = 20;
  const roomId = req.params.roomId;
  // Adds the comment and its object ID to the overall list of comments
  db.run('INSERT INTO Comments(text, userId, roomId) VALUES(?, ?, ?)', [text, userId, roomId], (err, room) => {
    if(err){
      return res.status(500)
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        .render('error', {err_message: "Sorry, you have reached an error"});
=======
        .render('500', {err_message: "Sorry, you have reached an error"});
>>>>>>> Stashed changes
=======
        .render('500', {err_message: "Sorry, you have reached an error"});
>>>>>>> Stashed changes
    }
    // Creates redirect URL to go back to object page, redirects to it
    res.redirect(`/room/${roomId}`);
  });
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

// Listen on socket
app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});
