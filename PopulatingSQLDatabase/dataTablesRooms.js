/* eslint-disable no-plusplus */
const sqlite3 = require('sqlite3');
// used Random Name Generator to generate 50 names http://random-name-generator.info/random/?n=50&g=1&st=2

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if (err) {
    throw err;
  }

dict = [
  //anomalies that cannot be uploaded using loop
   {
     house: 'Quincy',
     entryway: 'New Quincy',
     number: '200'
   },
   {
     house: 'Quincy',
     entryway: 'New Quincy',
     number: '500'
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
for(let i = 300, j = 601; i<328, j<629; i++, j++)
{
  dict.push({house: 'Quincy', entryway: 'New Quincy', number: i});
  dict.push({house: 'Quincy', entryway: 'New Quincy', number: j});
}
for(let i = 101; i<115; i++)
{
  dict.push({house: 'Quincy', entryway: 'Stone Hall South', number: i});
  if(i<=113){
  dict.push({house: 'Quincy', entryway: 'Stone Hall North', number: i});
  }
  if(i<=112){
    dict.push({house: 'Quincy', entryway: 'Stone Hall South', number: i+100});
    dict.push({house: 'Quincy', entryway: 'Stone Hall North', number: i+100});
    dict.push({house: 'Quincy', entryway: 'Stone Hall South', number: i+200});
    dict.push({house: 'Quincy', entryway: 'Stone Hall North', number: i+200});
    dict.push({house: 'Quincy', entryway: 'Stone Hall South', number: i+300});
  }
  if(i<=114){
    dict.push({house: 'Quincy', entryway: 'Stone Hall North', number: i+300});
  }
}
//there was no easy loop between floors/entryways since each had an unpredictably varying amount of rooms
//from looking at the floor plans, I made groups of three letters
//the first letter is the entryway, second is the floor
//third is the highest room number on that floor (upper bound of for loop for that floor for that entryway)
let eliot = 'A12B13C13D14E13F14G13J11K12L12O12A22B22C22D24E24F24G24H23I22J22K24L22M22N21A32B32C32D34E34F34G34H36I35J31K33L32M32N31O32B43C43D43E44F43G44H46I45J41K43M42N43O41B53C53D51E52F51G54H54I53J52K53'
//splits this into a list of strings of length three
let eliots = (eliot.match(/.{1,3}/g));
for (let i = 0; i< eliots.length; i++){
  for(let j = 1; j<=eliots[i].charAt(2); j++)
  {
    dict.push({house: 'Eliot', entryway: eliots[i].charAt(0), number: eliots[i].charAt(1)+ j})
  }
}
let kirkland = 'A13B13C14D12E12F12G14I11A27B24C23D22E22F21G24H24I28A34B34C34D32E32F31G34H34I34A41B44C42E42G42H42I42B52K52L52M52'
//splits this into a list of strings of length three
let kirks = (kirkland.match(/.{1,3}/g));
for (let i = 0; i< kirks.length; i++){
  for(let j = 1; j<=kirks[i].charAt(2); j++)
  {
    dict.push({house: 'Kirkland', entryway: kirks[i].charAt(0), number: kirks[i].charAt(1)+ j})
  }
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
