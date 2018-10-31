const fs = require('fs');
const sqlite3 = require('sqlite3');
//used Random Name Generator to generate 50 names http://random-name-generator.info/random/?n=50&g=1&st=2

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if(err){
    throw err;
  }
        var roomNum;
        var studentSize = db.run('SELECT COUNT(*) FROM Students');
        var roomSize = db.run('SELECT COUNT(*) FROM Rooms');
        console.log(roomSize);
        for(var i = 0; i< 10; i++)
        {
          var roomNum = Math.floor(Math.random()*roomSize)
          db.run('INSERT INTO Student_Rooms(studentId, roomId) VALUES(?, ?)', [i, roomNum]);
        }
    });
