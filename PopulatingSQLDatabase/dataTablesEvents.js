/* eslint-disable no-plusplus */
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if (err) {
    throw err;
  }
  // taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  function dateMake() {
    let text = '';
    const possible = '0123456789';
    // eslint-disable-next-line max-len
    for (let i = 0; i < 2; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return text;
  }
  function textMake(n) {
    let text = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz';
    // eslint-disable-next-line max-len
    for (let i = 0; i < n; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return text;
  }
  for (let i = 0; i < 30; i++) {
    const houseId = Math.round(Math.random() * 12);
    const date = `19${dateMake()}`;
    const eventName = textMake(10);
    const description = textMake(75);
    db.run('INSERT INTO Events(houseId, date, eventName, description) VALUES(?, ?, ?, ?)', [houseId, date, eventName, description]);
  }
});
