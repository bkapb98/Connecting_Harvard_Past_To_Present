/* eslint-disable no-plusplus */
const sqlite3 = require('sqlite3');
// used Random Name Generator to generate 50 names http://random-name-generator.info/random/?n=50&g=1&st=2

const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if (err) {
    throw err;
  }

  // taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  function makeid() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    // eslint-disable-next-line max-len
    for (let i = 0; i < 5; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

    return text;
  }
  function roomName() {
    let text = '';
    const possible = '1234567890';
    // eslint-disable-next-line max-len
    for (let i = 0; i < 3; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

    return text;
  }
  for (let i = 0; i < 50; i++) {
    const gradYear = Math.round(1900 + Math.random() * 110);
    let famous = false;
    if (Math.random() <= 0.1) {
      famous = true;
    }
    let privacyPref = false;
    if (Math.random() <= 0.1) {
      privacyPref = true;
    }
    const first = makeid();
    const last = makeid();
    db.run('INSERT INTO Students(firstName, lastName, graduationYear, famous, privacyPref) VALUES(?, ?, ?, ?, ?)', [first, last, gradYear, famous, privacyPref]);
    const roomNum = parseInt(roomName(), 10);
    db.run('INSERT INTO Student_Rooms(studentId, roomId) VALUES(?, ?)', [i, roomNum]);
  }
});

//load the rooms and the students here-- try to insert into the rooms table,
//if the room has not yet been inserted, add it to the rooms for that house
//add all students to the house
//add their affiliation to the given room for roomOne, roomTwo, and roomThree in student_rooms

let dict = [
  {
    firstName: 'Tobyn',
    lastName: 'Aaron',
    graduationYear: '2011',
    roomOne: '2008 Old Quincy B43',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
    //letters (regular expression) will represent entryway while numbers (regular expression) will represent name
  },
  {
    firstName: 'Pierre',
    lastName: 'Abousleim',
    graduationYear: '2011',
    roomOne: '2008 Old Quincy D22',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: 'Joshua',
    lastName: 'Abram',
    graduationYear: '2010',
    roomOne: '2008 Old Quincy E43',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: 'Psychology'
  },
  {
    firstName: 'Anna',
    lastName: 'Acosta',
    graduationYear: '2010',
    roomOne: '2008 New Quincy 308',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: 'English'
  },
  {
    firstName: 'Edwin',
    lastName: 'Acosta',
    graduationYear: '2010',
    roomOne: '2008 New Quincy 316',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: 'Whitney',
    lastName: 'Adair',
    graduationYear: '2011',
    roomOne: '2008 Old Quincy 2D26',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: 'Elizabeth',
    lastName: 'Adams',
    graduationYear: '2010',
    roomOne: '2008 New Quincy 318',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: 'Government'
  },
  {
    firstName: 'Khaled',
    lastName: 'Al Rabe',
    graduationYear: '2009',
    roomOne: '2008 Off Campus',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: 'Environmental Science and Public Policy'
  },
  {
    firstName: 'Talal',
    lastName: 'Alhammad',
    graduationYear: '2011',
    roomOne: '2008 2D01',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: 'Melissa',
    lastName: 'Alpert',
    graduationYear: '2010',
    roomOne: '2008 New Quincy 308',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: 'Government'
  },
  {
    firstName: 'Elizabeth',
    lastName: 'Altmaier',
    graduationYear: '2010',
    roomOne: '2008 New Quincy 315',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: 'Human Evolutionary Biology'
  },
  {
    firstName: 'Alexandra',
    lastName: 'Alves',
    graduationYear: '2011',
    roomOne: '2008 Old Quincy C43',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: 'Seema',
    lastName: 'Amble',
    graduationYear: '2009',
    roomOne: '2008 New Quincy 603',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: 'Economics'
  },
  {
    firstName: 'Rebecca',
    lastName: 'Anders',
    graduationYear: '2009',
    roomOne: '2008 New Quincy 605',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: 'History and Literature'
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
  {
    firstName: '',
    lastName: '',
    graduationYear: '',
    roomOne: '2008 ',
    roomTwo: '',
    roomThree: '',
    famous: '',
    privacyPref: '',
    house: 'Quincy',
    concentration: ''
  },
]
