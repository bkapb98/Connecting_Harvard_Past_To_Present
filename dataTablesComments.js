const fs = require('fs');
const sqlite3 = require('sqlite3');
var randomTimestamp = require('random-timestamps');

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if(err){
    throw err;
  }
//taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  function textMake()
  {
      let text = '';
      let possible = ' abcdefghijklmnopqrstuvwxyz';
      for (let i = 0; i < 100; i++)
      {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }
      //adapted from https://gist.github.com/miguelmota/5b67e03845d840c949c4
  function randomDate(start, end)
    {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
  for(let i = 0; i<500; i++)
    {
      let text = textMake();
      let date = randomTimestamp();
      let houseId = Math.round(Math.random()*12);
      let userId = Math.round(Math.random()*50);
      let roomId = Math.round(Math.random()*2400);
      db.run('INSERT INTO Comments(text, userId, roomId, time) VALUES(?, ?, ?, ?)', [text, userId, roomId, date]);
    }
    });