const fs = require('fs');
const sqlite3 = require('sqlite3');
//used Random Name Generator to generate 50 names http://random-name-generator.info/random/?n=50&g=1&st=2

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if(err){
    throw err;
  }

//taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    function makeid(n) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < n; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      }
    for(var i = 0; i<40; i++)
      {
        var first = makeid(7);
        var last = makeid(10);
        db.run('INSERT INTO Users(firstName, lastName) VALUES(?, ?)', [first, last]);
      }
    });
