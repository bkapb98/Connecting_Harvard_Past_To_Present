const express = require('express');
// const expressVue = require('express-vue');
// const path = require('path');
// require('cross-fetch/polyfill');
const sqlite3 = require('sqlite3');

const hostname = '127.0.0.1';
const port = 3000;

// Initialize Express
const app = express();
app.use(express.static('static'));

// Create database
let db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE);


// List galleries
app.get('/', (req, res) => {
    db.all('SELECT * FROM Houses', (err, rows) => {
        if(err) {
          return console.error(err.message); 
        }
        console.log("house info:", rows);
        // Render home page
        res.render('index.html', { houses: rows });
      });
});


// House Page
app.get('/house/:houseId', (req, res) => {
  const house_id = req.params.houseId;
  db.get(`SELECT * FROM Houses WHERE houseId = ${house_id}`, (err, house_info) => {
    if(err) {
      return console.error(err.message); 
    }
    console.log("house info:", house_info);
    // Render home page
    db.all(`SELECT * FROM Houses WHERE houseId = ${house_id}`, (err, events_info) => {
        if(err) {
          return console.error(err.message); 
        }
        console.log("events info:", events_info);
        // Render house page
        res.render('house.html', { events: events_info, houses: house_info });
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
      res.render('room.html', { room: room_info });
    });
  });


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