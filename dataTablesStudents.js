const fs = require('fs');
const sqlite3 = require('sqlite3');
//used Random Name Generator to generate 50 names http://random-name-generator.info/random/?n=50&g=1&st=2

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if(err){
    throw err;
  }

//taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
for(var i = 0; i<50; i++)
  {
    var gradYear = Math.round(1900 + Math.random()*110);
    var famous = false;
    if (Math.random()<= .1)
    {
      famous = true;
    }
    var privacyPref = false;
    if(Math.random()<=.1)
    {
      privacyPref = true;
    }
    var first = makeid();
    var last = makeid();
    db.run('INSERT INTO Students(firstName, lastName, graduationYear, famous, privacyPref) VALUES(?, ?, ?, ?, ?)', [first, last, gradYear, famous, privacyPref]);
  }
});
