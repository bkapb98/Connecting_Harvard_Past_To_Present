const fs = require('fs');
const sqlite3 = require('sqlite3');
//used Random Name Generator to generate 50 names http://random-name-generator.info/random/?n=50&g=1&st=2

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if(err){
    throw err;
  }
        let roomNum;
        let studentSize = db.run('SELECT COUNT(*) FROM Students');
        let roomSize = db.run('SELECT COUNT(*) FROM Rooms');
        for(let i = 0; i< 10; i++)
        {
          let roomNum = Math.floor(Math.random()*roomSize)
          db.run('INSERT INTO Student_Rooms(studentId, roomId) VALUES(?, ?)', [i, roomNum]);
        }
    });
