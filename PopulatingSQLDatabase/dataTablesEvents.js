const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if(err){
    throw err;
  }
//taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    function dateMake() {
        let text = "";
        let possible = "0123456789";
        for (let i = 0; i < 2; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      }
      function textMake(n) {
          let text = "";
          let possible = "abcdefghijklmnopqrstuvwxyz";
          for (let i = 0; i < n; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          return text;
        }
    for(let i = 0; i<30; i++)
      {
        let houseId = Math.round(Math.random()*12);
        let date = "19" + dateMake();
        let eventName = textMake(10);
        let description = textMake(75);
        db.run('INSERT INTO Events(houseId, date, eventName, description) VALUES(?, ?, ?, ?)', [houseId, date, eventName, description]);
      }
    });
