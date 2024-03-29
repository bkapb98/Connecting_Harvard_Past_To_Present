/* eslint-disable no-plusplus */
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if (err) {
    throw err;
  }
  // taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  function textMake() {
    let text = '';
    const possible = ' abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 100; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  for (let i = 0; i < 500; i++) {
    const text = textMake();
    const userId = Math.round(Math.random() * 50);
    const roomId = Math.round(Math.random() * 2400);
    db.run('INSERT INTO Comments(text, userId, roomId) VALUES(?, ?, ?)', [text, userId, roomId]);
  }
});
