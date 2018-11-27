/* eslint-disable no-plusplus */
const sqlite3 = require('sqlite3');
// used Random Name Generator to generate 50 names http://random-name-generator.info/random/?n=50&g=1&st=2

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if (err) {
    throw err;
  }

  // taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  function makeid(n) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    // eslint-disable-next-line max-len
    for (let i = 0; i < n; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return text;
  }
  for (let i = 0; i < 200; i++) {
    const first = makeid(7);
    const last = makeid(10);
    const userName = makeid(8);
    const password = makeid(12);
    db.run('INSERT INTO Users(firstName, lastName, userName, password) VALUES(?, ?, ?, ?)', [first, last, userName, password]);
  }
});
