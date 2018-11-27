/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const async = require('async');
const session = require('express-session');
const Tokenizer = require('tokenize-text');

const tokenize = new Tokenizer();
require('cross-fetch/polyfill');
const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;

// authorizer middleware
const authChecker = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

// Initialize Express
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
  secret: 'ssshhhhh',
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create database
const db = new sqlite3.Database('PopulatingSQLDatabase/ConnectingPG.db', sqlite3.OPEN_READWRITE);

// List houses
// Implement in parallel instead: https://caolan.github.io/async/docs.html#parallel
room_numbers = [];

app.get('/', (req, res) => {
  async.parallel({
    // Get room numbers
    rooms_info(callback) {
      db.all('SELECT Rooms.name, Rooms.id, Houses.name AS houseName FROM Rooms LEFT JOIN Houses ON Rooms.houseId = Houses.id', (err, rooms_info) => {
        if (err) {
          return res.status(500)
            .render('error', { err_message: 'Sorry, you have reached an error', user: req.session.user });
        }
        callback(null, rooms_info);
      });
    },
    house_info(callback) {
      db.all('SELECT * FROM Houses', (err, house_info) => {
        if (err) {
          return res.status(500)
            .render('error', { err_message: 'Sorry, you have reached an error', user: req.session.user });
        }
        callback(null, house_info);
      });
    },
  },
  // Render home page
  (err, results) => {
    res.render('index', { houses: results.house_info, rooms: results.rooms_info, user: req.session.user });
  });
});


// House Page
app.get('/house/:houseId', (req, res) => {
  const house_id = req.params.houseId;
  async.parallel({
    // Get event information
    events_info(callback) {
      // Sorted per https://www.tutorialspoint.com/sql/sql-sorting-results.htm
      db.all('SELECT * FROM Events WHERE houseId = ? ORDER BY DATE ASC', house_id, (err, events_info) => {
        if (err) {
          return res.status(500)
            .render('error', { err_message: 'Sorry, you have reached an error', user: req.session.user });
        }
        callback(null, events_info);
      });
    },
    // Get house information
    house_info(callback) {
      db.get('SELECT * FROM Houses WHERE id = ?', house_id, (err, house_info) => {
        if (err) {
          return res.status(500)
            .render('error', { err_message: 'Sorry, you have reached an error', user: req.session.user });
        }
        callback(null, house_info);
      });
    },
    fRoom_info(callback) {
      db.all('SELECT * FROM featuredRoom WHERE houseId = ?', house_id, (err, house_info) => {
        if (err) {
          return res.status(500)
            .render('error', { err_message: 'Sorry, you have reached an error', user: req.session.user });
        }
        callback(null, house_info);
      });
    },
    // Get room information
    rooms_info(callback) {
      db.all('SELECT * FROM Rooms WHERE houseId = ? ORDER BY LENGTH(Name), Name ASC', house_id, (err, rooms_info) => {
        if (err) {
          return res.status(500)
            .render('error', { err_message: 'Sorry, you have reached an error', user: req.session.user });
        }
        callback(null, rooms_info);
      });
    },
  },
  (err, results) => {
    // change to houseInfo
    const house = results.house_info;
    const houseName = house.name;
    // Search Hollis for house
    const url = `http://api.lib.harvard.edu/v2/items.json?title=${houseName}+house`;
    fetch(url)
      .then(response => response.json())
    // clean up variable names - froominfo
      .then((data) => {
        res.render('house', {
          house: results.house_info,
          rooms: results.rooms_info,
          events: results.events_info,
          featuredRooms: results.fRoom_info,
          resources: data.items.mods,
          user: req.session.user,
        });
      });
  });
});

// Room Page
app.get('/room/:roomId', (req, res) => {
  const room_id = req.params.roomId;
  async.parallel({
    // Get room info
    room_info(callback) {
      db.get('SELECT * FROM Rooms WHERE id = ?', room_id, (err, room_info) => {
        if (err) {
          return res.status(500)
            .render('error', { err_message: 'Sorry, you have reached an error', user: req.session.user });
        }
        callback(null, room_info);
      });
    },
    // Get comments
    comments(callback) {
      db.all('SELECT * FROM Comments WHERE roomId = ?', room_id, (err, comments_info) => {
        if (err) {
          return res.status(500)
            .render('error', { err_message: 'Sorry, you have reached an error', user: req.session.user });
        }
        callback(null, comments_info);
      });
    },
  },
  // Render room page
  (err, results) => {
    res.render('room', { room: results.room_info, comments: results.comments, user: req.session.user });
  });
});

app.get('/featuredRoomJs.js', (req, res) => {
  res.sendfile('featuredRoomJs.js');
});

// Featured Room Page
app.get('/featuredRoom/:roomId', (req, res) => {
  const room_id = req.params.roomId;
  db.get('SELECT * FROM featuredRoom WHERE id = ?', room_id, (err, room_info) => {
    // consistent space- node.js linter- spacing
    if (err) {
      return res.status(500)
        .render('error', { err_message: 'Sorry, you have reached an error1', user: req.session.user });
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
  db.get('SELECT * FROM Users WHERE userName = ? AND password = ?', username, password, (err, result) => {
    if (err) {
      return res.status(500)
        .render('error', { err_message: 'It looks like you have no registered account per those credentials.', user: req.session.user });
    }
    if (!result) {
      return res.status(404)
        .render('error', { err_message: 'It looks like you have no registered account per those credentials.', user: req.session.user });
    }
    if (result.userName === username && result.password === password) {
      req.session.user = { username };
      res.redirect('/');
    } else {
      res.redirect('/login');
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
  db.run('INSERT INTO Users(firstName, lastName, userName, password) VALUES(?, ?, ?, ?)', [first, last, userName, password], (err) => {
    if (err) {
      return res.status(404)
        .render('error', { err_message: 'Sorry, that username is taken.' });
    }
    req.session.user = { userName };
    res.redirect('/');
  });
});

function containsDigit(contents) {
  const extractNumber = tokenize.re(/[0-9]/);
  const nums = extractNumber(contents);
  console.log(nums)
  let name = "";
  nums.forEach(num=>{
    name+=num.value;
})
  return name;
}

app.post('/roomhandler', (req, res) => {
  const name = req.body.inputs;
  if (containsDigit(name)) {
    const roomName = containsDigit(name);
    console.log(roomName)
    db.get('SELECT id FROM Rooms WHERE name = ?', roomName, (err, room) => {
      if (err) {
        return res.status(500)

          .render('error', { err_message: 'Sorry, you have reached an error' });
      }
      if (room) {
        res.redirect(`/room/${room.id}`);
      } else {
        return res.status(404)
          .render('error', { err_message: 'Sorry, no matching results.', user: req.session.user });
      }
    });
  } else {
    db.get('SELECT id FROM Houses WHERE name = ?', name, (err, house) => {
      if (err) {
        return res.status(500)
          .render('error', { err_message: 'Sorry, you have reached an error.' });
      }
      if (house) {
        res.redirect(`/house/${house.id}`);
      } else {
        return res.status(404)
          .render('error', { err_message: 'Sorry, no matching results', user: req.session.user });
      }
    });
  }
});

app.post('/commenthandler/:roomId', authChecker, (req, res) => {
  const text = req.body.comment;
  const userId = 20;
  const roomId = req.params.roomId;
  // Adds the comment and its object ID to the overall list of comments
  db.run('INSERT INTO Comments(text, userId, roomId) VALUES(?, ?, ?)', [text, userId, roomId], (err) => {
    if (err) {
      return res.status(500)
        .render('error', { err_message: 'Sorry, you have reached an error' });
    }
    // Creates redirect URL to go back to object page, redirects to it
    res.redirect(`/room/${roomId}`);
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Listen on socket
app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://${hostname}:${port}/`);
});
