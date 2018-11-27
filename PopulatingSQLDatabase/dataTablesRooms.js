/* eslint-disable no-plusplus */
const sqlite3 = require('sqlite3');
// used Random Name Generator to generate 50 names http://random-name-generator.info/random/?n=50&g=1&st=2

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if (err) {
    throw err;
  }
  // taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  function roomName() {
    let text = '';
    const possible = '1234567890';
    // eslint-disable-next-line max-len
    for (let i = 0; i < 3; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

    return text;
  }
  function roomDescription() {
    let text = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz';
    // eslint-disable-next-line max-len
    for (let i = 0; i < 20; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

    return text;
  }
  for (let i = 0; i < 2400; i++) {
    const name = roomName();
    const description = roomDescription();
    const houseId = Math.round(Math.random() * 12);
    db.run('INSERT INTO Rooms(name, description, houseId) VALUES(?, ?, ?)', [name, description, houseId]);
  }
});
