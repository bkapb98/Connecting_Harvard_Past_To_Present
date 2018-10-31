const fs = require('fs');
const sqlite3 = require('sqlite3');
//used Random Name Generator to generate 50 names http://random-name-generator.info/random/?n=50&g=1&st=2

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if(err){
    throw err;
  }
//taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    function roomName() {
        var text = "";
        var possible = "1234567890";
        for (var i = 0; i < 3; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    function roomDescription() {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 20; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    for(var i = 0; i<50; i++)
      {
        var name = roomName();
        var description = roomDescription();
        var houseId = Math.round(Math.random()*12);
        db.run('INSERT INTO Rooms(name, description, houseId) VALUES(?, ?, ?)', [name, description, houseId]);
      }
    });
