/* eslint-disable guard-for-in */
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if (err) {
    throw err;
  }
  // taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  // eslint-disable-next-line no-param-reassign
  dict = [
    {
    // will use join to say the alias of house is "name" in the house table, can join
      name: 'FDR Suite',
      description: 'Once home to former U.S. President Franklin Delano Roosevelt, the FDR Suite is now open for Board Game Nights and special events like Harvard Thanksgiving.',
      house: 'Adams',
      beforeImg: 'http://www.fdrsuite.org/IMAGES/B-22.jpg',
      afterImg: 'http://fdrfoundation.org/wp-content/uploads/2016/06/fdrsuite10_1200.jpg',
    },
    {
    // will use join to say the alias of house is "name" in the house table, can join
      name: 'JFK Suite',
      description: 'Once home to former U.S. President John F. Kennedy, the JFK Suite in Winthrop F14 in Gore Hall features an Underwood typewriter similar to that which John F. Kennedy used to write his senior thesis.',
      house: 'Winthrop',
      beforeImg: 'https://i2.wp.com/news.harvard.edu/wp-content/uploads/2017/01/jfk-at-his-desk3_605.jpg?resize=605%2C403&ssl=1',
      afterImg: 'https://i0.wp.com/news.harvard.edu/wp-content/uploads/2011/06/pj_09.jpg?fit=940%2C627&ssl=1',
    },
  ];
  // eslint-disable-next-line guard-for-in
  // eslint-disable-next-line no-restricted-syntax
  for (const key in dict) {
    // eslint-disable-next-line no-shadow
    db.get('SELECT id FROM Houses WHERE name = ?', dict[key].house, (err, house) => {
      if (err) {
        throw err;
      }
      db.run('INSERT INTO featuredRoom(houseId, name, description, beforeImg, afterImg) VALUES(?, ?, ?, ?, ?)', [house.id, dict[key].name, dict[key].description, dict[key].beforeImg, dict[key].afterImg]);
    });
  }
});
