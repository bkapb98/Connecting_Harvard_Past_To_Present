/* eslint-disable no-useless-concat */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
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
const validator = require('validator');


const tokenize = new Tokenizer();
require('cross-fetch/polyfill');
const bodyParser = require('body-parser');

// Check if enough arguments https://www.npmjs.com/package/validator
if (process.argv.length !== 4) {
  // eslint-disable-next-line no-console
  console.log('Sorry, you do not have the appropriate number of arguments.');
  process.exit(1);
}
// Based on https://nodejs.org/docs/latest/api/process.html#process_process_argv
const hostname = (process.argv.length === 3) ? process.argv[2] : '0.0.0.0';
const port = process.env.PORT || 8080;


// Check valid inputs, using https://www.npmjs.com/package/validator
if (!validator.isIP(hostname)) {
  // eslint-disable-next-line no-console
  console.log('Sorry, that is an invalid hostname.');
  process.exit(1);
}

if (!validator.isPort(port)) {
  // eslint-disable-next-line no-console
  console.log('Sorry, that is an invalid port.');
  process.exit(1);
}

// Error handling https://getbootstrap.com/docs/4.0/components/jumbotron/
// Authorizer middleware
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
app.use(express.static(__dirname));


app.use(session({
  secret: 'ssshhhhh',
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function error_handling(req, res, code, message) {
  res.status(code)
    .render('error', { err_message: message, user: req.session.user, title: 'ERROR' });
}
// Translates numeric month into month name
function month(num_month) {
  months = ['January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'];
  return (months[num_month - 1]);
}

// Create database
const db = new sqlite3.Database('PopulatingSQLDatabase/ConnectingPG.db', sqlite3.OPEN_READWRITE);

// List houses
// Implement in parallel instead: https://caolan.github.io/async/docs.html#parallel
room_numbers = [];

app.get('/', (req, res) => {
  async.parallel({
    // Get room numbers
    rooms_info(callback) {
      db.all('SELECT Rooms.entryway, Rooms.number, Rooms.id, Houses.name AS houseName FROM Rooms LEFT JOIN Houses ON Rooms.houseId = Houses.id', callback);
    },
    house_info(callback) {
      db.all('SELECT * FROM Houses', callback);
    },
  },
  // Render home page
  (err, results) => {
    if (err) {
      return (error_handling(req, res, 500, 'Sorry, you have reached an error.'));
    }
    res.render('index', {
      houses: results.house_info, rooms: results.rooms_info, user: req.session.user, title: 'Connecting',
    });
  });
});


// House Page
app.get('/house/:houseId', (req, res) => {
  const house_id = req.params.houseId;
  async.parallel({
    // Get event information
    events_info(callback) {
      // Help with sorting by date via https://www.dofactory.com/sql/order-by
      db.all('SELECT * FROM Events WHERE houseId = ? ORDER BY YEAR ASC, MONTH ASC', house_id, (err, events) => {
        /* Code for NYT API (entire for loop) with help from
        https://developer.nytimes.com/article_search_v2.json#/Console/GET/articlesearch.json */
        for (const i in events) {
          // Set article to null to initialize
          // eslint-disable-next-line no-param-reassign
          events[i].article = null;
          // Construct url for NYT API
          const url = new URL('https://api.nytimes.com/svc/search/v2/articlesearch.json');
          const params = {
            'api-key': 'e8ebee351d174f58bc3086a7917d1509',
            q: `${events[i].year}`,
            begin_date: `${events[i].year}` + '0101',
            end_date: `${events[i].year}` + '1231',
          };
          Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
          fetch(url)
            .then(response => response.json())
            .then((data) => {
              if (data.response) {
                if (data.response.docs[0]) {
                  // eslint-disable-next-line no-param-reassign
                  events[i].article = data.response.docs[0].web_url;
                }
              }
            });
        }
        callback(err, events);
      });
    },
    // Get house information
    house_info(callback) {
      db.get('SELECT * FROM Houses WHERE id = ?', house_id, callback);
    },
    featuredRooms_info(callback) {
      db.all('SELECT * FROM featuredRoom WHERE houseId = ?', house_id, callback);
    },
    // Get room information
    rooms_info(callback) {
      db.all('SELECT * FROM Rooms WHERE houseId = ? ORDER BY Entryway, LENGTH(Number), Number ASC', house_id, callback);
    },
  },
  (err, results) => {
    if (err) {
      return (error_handling(req, res, 500, 'Sorry, you have reached an error.'));
    }

    const house = results.house_info;
    const houseName = house.name;
    // Search Hollis for house
    const url = `http://api.lib.harvard.edu/v2/items.json?title=${houseName}+house`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        res.render('house', {
          house: results.house_info,
          title: houseName,
          rooms: results.rooms_info,
          events: results.events_info,
          featuredRooms: results.featuredRooms_info,
          resources: data.items.mods,
          user: req.session.user,
          month_name: month,
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
      db.get('SELECT Houses.id, Rooms.houseId, Houses.logourl, Rooms.entryway, Rooms.number, Rooms.id AS idRoom FROM Rooms LEFT JOIN Houses on Rooms.houseId =  Houses.id WHERE Rooms.id = ?', room_id, callback);
    },
    // Get comments
    comments(callback) {
      db.all('SELECT * FROM Comments LEFT JOIN Users on Comments.userId = Users.id WHERE Comments.roomId = ?', room_id, callback);
    },
  },
  // Render room page
  (err, results) => {
    if (err) {
      return (error_handling(req, res, 500, 'Sorry, you have reached an error.'));
    }
    
    res.render('room', {
      room: results.room_info,
      comments: results.comments,
      user: req.session.user,
      title: `${results.room_info.entryway} ${results.room_info.number}`,
    });
  });
});

app.get('/featuredRoomJs.js', (req, res) => {
  res.sendfile('featuredRoomJs.js');
});

// Featured Room Page
app.get('/featuredRoom/:roomId', (req, res) => {
  const room_id = req.params.roomId;
  db.get('SELECT * FROM featuredRoom WHERE id = ?', room_id, (err, room_info) => {
    if (err) {
      return (error_handling(req, res, 500, 'Sorry, you have reached an error.'));
    }
    res.render('room_featured', { room: room_info, user: req.session.user, title: room_info.name });
  });
});

app.get('/login', (req, res) => {
  res.render('login.ejs', { user: req.session.user, title: 'Login' });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.get('SELECT * FROM Users WHERE userName = ? AND password = ?', username, password, (err, result) => {
    if (err) {
      return (error_handling(req, res, 404, 'It looks like you have no registered account per those credentials.'));
    }
    if (!result) {
      return (error_handling(req, res, 404, 'It looks like you have no registered account per those credentials.'));
    }
    if (result.userName === username && result.password === password) {
      req.session.user = { id: result.id };
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });
});

app.get('/register', (req, res) => {
  res.render('register.ejs', { user: req.session.user, title: 'Register' });
});

app.post('/register', (req, res) => {
  const first = req.body.firstname;
  const last = req.body.lastname;
  const userName = req.body.username;
  const password = req.body.password;
  db.run('INSERT INTO Users(firstName, lastName, userName, password) VALUES(?, ?, ?, ?)', [first, last, userName, password], (err) => {
    if (err) {
      return (error_handling(req, res, 404, 'Sorry, that username is taken.'));
    }
    // need user id so have to call db
    // eslint-disable-next-line no-shadow
    db.get('SELECT * FROM Users WHERE userName = ?', userName, (err, result) => {
      if (err) {
        return (error_handling(req, res, 404, 'Sorry, something went wrong'));
      }
      req.session.user = { id: result.id };
      res.redirect('/');
    });
  });
});

function roomNumber(contents) {
  const extractNumber = tokenize.re(/[0-9]/);
  const nums = extractNumber(contents);
  let name = '';
  nums.forEach((num) => {
    name += num.value;
  });
  return name;
}

function entryway(contents) {
  // eslint-disable-next-line no-shadow
  const entryway = tokenize.words()(contents);
  let entry = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < entryway.length - 1; i++) {
    entry += entryway[i].value;
    if (i !== entryway.length - 2) {
      entry += ' ';
    }
  }
  return entry;
}

app.post('/roomhandler', (req, res) => {
  const name = req.body.inputs;
  if (roomNumber(name)) {
    const roomName = roomNumber(name);
    const entry = entryway(name);
    db.get('SELECT id FROM Rooms WHERE number = ? AND entryway = ?', [roomName, entry], (err, room) => {
      if (err) {
        return (error_handling(req, res, 500, 'Sorry, you have reached an error.'));
      }
      if (room) {
        res.redirect(`/room/${room.id}`);
      } else {
        return (error_handling(req, res, 404, 'Sorry, no matching results.'));
      }
    });
  } else {
    db.get('SELECT id FROM Houses WHERE name = ?', name, (err, house) => {
      if (err) {
        return (error_handling(req, res, 500, 'Sorry, you have reached an error.'));
      }
      if (house) {
        res.redirect(`/house/${house.id}`);
      } else {
        return (error_handling(req, res, 404, 'Sorry, no matching results.'));
      }
    });
  }
});

app.post('/commenthandler/:roomId', authChecker, (req, res) => {
  const text = req.body.comment;
  const userId = req.session.user.id;
  const roomId = req.params.roomId;
  // Adds the comment and its object ID to the overall list of comments
  db.run('INSERT INTO Comments(text, userId, roomId) VALUES(?, ?, ?)', [text, userId, roomId], (err) => {
    if (err) {
      return (error_handling(req, res, 500, 'Sorry, you have reached an error.'));
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
