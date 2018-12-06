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
      description: 'Once home to former Mark Elliot Zuckerberg, Zuckerberg lived in Kirkland H33. Zuckerberg is an American technology entrepreneur and philanthropist. He is known for co-founding and leading Facebook as its chairman and chief executive officer.',
      house: 'Kirkland',
      beforeImg: 'https://qph.fs.quoracdn.net/main-qimg-75ca5274491299f902aea2298adf7a33',
      afterImg: 'http://bostonglobe.com/rf/image_585w/Boston/2011-2020/2017/05/25/BostonGlobe.com/Metro/Images/1c7f9ecdfb774540b4d197c4a4956248-1c7f9ecdfb774540b4d197c4a4956248-0[1].jpg',
    },
    {
    // will use join to say the alias of house is "name" in the house table, can join
      name: 'Poker Room',
      description: 'It was in the Poker Room that Bill Gates and Paul Allen formed Microsoft, one of the world\'\s most successful software companies.',
      house: 'Currier',
      beforeImg: 'https://i1.wp.com/news.harvard.edu/wp-content/uploads/2015/11/112815_libraries_0005_922.jpg?fit=922%2C615&ssl=1',
      afterImg: 'https://i.pinimg.com/originals/88/0b/85/880b85423ce5919b7a538ed0a83106bd.jpg',
    },
    {
      name: 'Fête in the Courtyard',
      description: 'For decades Eliot has been celebrating its house formal, Fête, in its courtyard.',
      house: 'Eliot',
      beforeImg: 'https://eliot.harvard.edu/files/eliot/files/image_1.png?m=1428992502',
      afterImg: 'https://static.projects.iq.harvard.edu/files/styles/os_slideshow_16%3A9_820/public/eliot/files/1908321_1430454830540553_342370157624418259_n.jpg?m=1428994936&itok=70--UoOw',
    },
    {
      name: 'Qube Library',
      description: 'Quincy House\'\s Library hangs off of the New Quincy building and is open 24 hours for diligent students. Here we see the Qube under construction compared to the library in its splendor today.',
      house: 'Quincy',
      beforeImg: 'https://pbs.twimg.com/media/DXtJA04WAAE01DR.jpg',
      afterImg: 'https://s3.amazonaws.com/thumbnails.thecrimson.com/photos/2014/03/07/232235_1294628.jpg.1500x1045_q95_crop-smart_upscale.jpg',
    },
    {
      name: 'Dining Hall',
      description: 'This dining hall is one of the most luxurious and time-tested spaces in the upperclassman houses.',
      house: 'Dunster',
      beforeImg: 'https://dunster.harvard.edu/main/wp-content/uploads/2013/07/dining_hall.jpg',
      afterImg: 'https://dunster.harvard.edu/main/wp-content/uploads/2015/12/DSC_0829.jpg?w=383&h=255',
    },
    {
      name: 'Bell Tower',
      description: 'The Lowell House Bell Tower features bells originally from Russia.',
      house: 'Lowell',
      beforeImg: 'https://media.gettyimages.com/photos/twoton-bell-made-in-the-1795-is-raised-into-the-tower-of-lowell-house-picture-id659247576',
      afterImg: 'http://www.russianbells.com/interest/harvard-danilov/harv-dan-bell_in_arch.jpg',
    },
    {
      name: 'Moors Hall Common Room',
      description: 'This room was once home only to residents of Radcliffe College as shown in the before picture. It would only be later integrated into Pforzheimer House and become co-ed.',
      house: 'Pforzheimer',
      beforeImg: 'https://i1.wp.com/news.harvard.edu/wp-content/uploads/2012/02/phoho_500.jpg?ssl=1',
      afterImg: 'https://harvardmagazine.com/sites/default/files/img/article/0212/2.23.12.jpg',
    },
    {
      name: 'Aquarium',
      description: 'A common space for social gatherings, the Cabot Aquarium is a modern place for students to unite and have fun.',
      house: 'Cabot',
      beforeImg: 'https://images.fineartamerica.com/images-medium-large-5/cabot-house-harvard-nomad-art-and-design.jpg',
      afterImg: 'https://cabot.harvard.edu/files/cabot/files/aquarium.jpg?m=1467751052',
    },
    {
      name: 'Tranquility Room',
      description: 'We see Mather as it was originally designed and then the inside the Tranquility Room, a space for students to relax and unwind despite the stress of exams.',
      house: 'Mather',
      beforeImg: 'http://s3.transloadit.com.s3.amazonaws.com/4b30ae61b7c84e42b6be045272ec3211/66/c8f0306d1e11e6aeae432a04249c3d/3-mather-house.jpg',
      afterImg: 'https://static.projects.iq.harvard.edu/files/styles/os_files_large/public/mather/files/tranquility-room.jpg?m=1435238514&itok=ZMVrMv2B',
    },
    {
      name: 'Junior Common Room',
      description: 'Starting with Leverett House from the outside in its antiquity, we move into the modern Junior Common Room, a splendid room that captures Harvard\'\s elegance and opulence in all its splendor.',
      house: 'Leverett',
      beforeImg: 'https://c1.staticflickr.com/4/3189/2790196579_4ae0fc46c7_b.jpg',
      afterImg: 'https://s3.amazonaws.com/thumbnails.thecrimson.com/photos/2015/03/09/205658_1304826.jpg.1500x1000_q95_crop-smart_upscale.jpg',
    },
    {
      name: 'Dining Hall',
      description: 'Winthrop\'\s Dining Hall has served as a catalyst for this house\'\s community since its inception.',
      house: 'Winthrop',
      beforeImg: 'https://harvardmagazine.com/sites/default/files/img/article/0215/IMG_3826_new.jpg',
      afterImg: 'https://s3.amazonaws.com/thumbnails.thecrimson.com/photos/2015/03/08/234128_1304784.jpg.1500x997_q95_crop-smart_upscale.jpg'
    }
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
