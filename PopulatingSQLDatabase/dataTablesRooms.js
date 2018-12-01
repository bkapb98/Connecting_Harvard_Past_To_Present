/* eslint-disable no-plusplus */
const sqlite3 = require('sqlite3');
// used Random Name Generator to generate 50 names http://random-name-generator.info/random/?n=50&g=1&st=2

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if (err) {
    throw err;
  }

dict = [
   {
     house: 'Quincy',
     entryway: 'New Quincy',
     number: '200'
 },
  {
    house: 'Eliot',
    entryway: 'A',
    number: '51'
  },
  {
    house: 'Kirkland',
    entryway: 'H',
    number: '21'
  },
  {
    house: 'Leverett',
    entryway: 'McKinlock D',
    number: '34'
  },
  {
    house: 'Pforzheimer',
    entryway: 'Moors D',
    number: '1'
  },
  {
    house: 'Cabot',
    entryway: 'D',
    number: '216'
  },
  {
    house: 'Currier',
    entryway: 'Daniels',
    number: '539'
  },
  {
    house: 'Mather',
    entryway: 'Tower',
    number: '12'
  },
  {
    house: 'Dunster',
    entryway: 'West',
    number: '423'
  },
  {
    house: 'Lowell',
    entryway: 'Fairfax',
    number: '1313'
  },
  {
    house: 'Winthrop',
    entryway: 'Gore',
    number: '313'
  },
  {
    house: 'Adams',
    entryway: 'Claverly',
    number: '4243'
  }
]
for(let i = 300; i<328; i++)
{
  dict.push({house: 'Quincy', entryway: 'New Quincy', number: i})
}

  for (const key in dict) {
    // eslint-disable-next-line no-shadow
    db.get('SELECT id FROM Houses WHERE name = ?', dict[key].house, (err, house) => {
      if (err) {
        throw err;
      }
      db.run('INSERT INTO Rooms(houseId, entryway, number) VALUES(?, ?, ?)', [house.id, dict[key].entryway, dict[key].number]);
    });
  }
});
