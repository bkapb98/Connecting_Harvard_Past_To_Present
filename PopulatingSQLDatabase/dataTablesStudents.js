const sqlite3 = require('sqlite3');
//used Random Name Generator to generate 50 names http://random-name-generator.info/random/?n=50&g=1&st=2

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if(err){
    throw err;
  }

//taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    function makeid() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (let i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    function roomName() {
        let text = "";
        let possible = "1234567890";
        for (let i = 0; i < 3; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    for(let i = 0; i<50; i++)
      {
        let gradYear = Math.round(1900 + Math.random()*110);
        let famous = false;
        if (Math.random()<= .1)
        {
          famous = true;
        }
        let privacyPref = false;
        if(Math.random()<=.1)
        {
          privacyPref = true;
        }
        let first = makeid();
        let last = makeid();
        db.run('INSERT INTO Students(firstName, lastName, graduationYear, famous, privacyPref) VALUES(?, ?, ?, ?, ?)', [first, last, gradYear, famous, privacyPref]);
        let roomNum = parseInt(roomName(), 10);
        db.run('INSERT INTO Student_Rooms(studentId, roomId) VALUES(?, ?)', [i, roomNum]);
      }
    });
