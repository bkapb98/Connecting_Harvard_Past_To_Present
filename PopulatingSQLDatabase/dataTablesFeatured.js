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
    {
    // will use join to say the alias of house is "name" in the house table, can join
      name: 'Zuckerberg Suite',
      description: 'Once home to former Mark Elliot Zuckerberg, Zuckerberg lived in Kirkland H33. Zuckerber is an American technology entrepreneur and philanthropist. He is known for co-founding and leading Facebook as its chairman and chief executive officer..',
      house: 'Kirkland',
      beforeImg: 'https://qph.fs.quoracdn.net/main-qimg-75ca5274491299f902aea2298adf7a33',
      afterImg: 'http://bostonglobe.com/rf/image_585w/Boston/2011-2020/2017/05/25/BostonGlobe.com/Metro/Images/1c7f9ecdfb774540b4d197c4a4956248-1c7f9ecdfb774540b4d197c4a4956248-0[1].jpg',
    },
    {
    // will use join to say the alias of house is "name" in the house table, can join
      name: 'Poker Room',
      description: 'The Poker Room in Currier House at Harvard University, where Bill Gates and Paul Allen formed Microsoft',
      house: 'Currier',
      beforeImg: 'https://image.slidesharecdn.com/presentationonbillgatesiii-120808233953-phpapp02/95/presentation-on-bill-gates-iii-14-728.jpg?cb=1404766290',
      afterImg: 'https://i2.wp.com/news.harvard.edu/wp-content/uploads/2011/04/040111_currier_183_500.jpg?resize=500%2C334&ssl=1',
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
