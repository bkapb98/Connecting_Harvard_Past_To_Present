const express = require('express');
// const expressVue = require('express-vue');
const path = require('path');
require('cross-fetch/polyfill');
const sqlite3 = require('sqlite3');
let bodyParser = require('body-parser')
const hostname = '127.0.0.1';
const port = 3000;

// Initialize Express
const app = express();
// app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.use(express.staticProvider(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// Create database
let db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE);


// List houses
app.get('/', (req, res) => {
    db.all('SELECT * FROM Houses', (err, rows) => {
        if(err) {
          return console.error(err.message); 
        }
        console.log("house info:", rows);
        // Render home page
        res.render('index', { houses: rows });
      });
});


// House Page
app.get('/house/:houseId', (req, res) => {
  const house_id = req.params.houseId;
  //implement in parallel instead: https://caolan.github.io/async/docs.html#parallel
  db.get(`SELECT * FROM Houses WHERE houseId = ${house_id}`, (err, house_info) => {
    if(err) {
      return console.error(err.message); 
    }
    //console.log("house info:", house_info);
    // Render home page
    db.all(`SELECT * FROM Houses WHERE houseId = ${house_id}`, (err, events_info) => {
      if(err) {
        return console.error(err.message); 
      }
      db.all(`SELECT * FROM Rooms WHERE houseId = ${house_id}`, (err, rooms_info) => {
        if(err) {
          return console.error(err.message); 
        }
        // Render house page
        console.log(rooms_info)
        res.render('house', { events: events_info, house: house_info, rooms: rooms_info });
      });
    });
  });
});

// Room Page
app.get('/room/:roomId', (req, res) => {
    const room_id = req.params.roomId;
    db.get(`SELECT * FROM Rooms WHERE roomId = ${room_id}`, (err, room_info) => {
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


// // Comment on object
// app.get('/objects/:object_id/comment', (req, res) => {
//   const objectId = req.params.object_id;
//   const newComment = req.query.comments;
//   // Inserts comment into db associating it with the object, then redirects to object page
//   db.run(`INSERT INTO comment_table 
//   (comment_text, object_number) VALUES ("${newComment}", "${objectId}");`); 
//   res.redirect(`/objects/${objectId}`);

// });

// Listen on socket
app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});