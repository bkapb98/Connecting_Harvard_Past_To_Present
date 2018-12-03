/* eslint-disable no-restricted-syntax */
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('connectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if (err) {
    throw err;
  }

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-param-reassign
  dict = [
    {
      name: 'Adams',
      imgurl: 'https://i0.wp.com/news.harvard.edu/wp-content/uploads/2018/04/adams-1692500_mini.jpg?resize=1600%2C900&ssl=1',
      description: 'Adams is a centrally located house that once housed FDR and is slated to be renovated in 2019.',
      address: '26 Plympton Street',
      founding: 1931,
      logourl: 'https://static.hwpi.harvard.edu/files/styles/os_files_small/public/osl/files/adams-shield.png?m=1515604329&itok=oH1IU7vv',
    },
    {
      name: 'Cabot',
      imgurl: 'https://static.projects.iq.harvard.edu/files/styles/os_slideshow_16%3A9_980/public/cabot/files/cabotcover1.jpg?m=1515613588&itok=85ZSNBUG',
      description: 'Cabot House is home to Dean Rakesh Khurana, the current dean of Harvard College.',
      address: '60 Linnaean Street',
      founding: 1970,
      logourl: 'https://static.hwpi.harvard.edu/files/styles/os_files_small/public/osl/files/cabot-shield.png?m=1515604329&itok=Cx1jTp1u',
    },
    {
      name: 'Currier',
      imgurl: 'https://s3.amazonaws.com/thumbnails.thecrimson.com/photos/2018/03/01/234610_1328654.jpg.600x600_q95_crop-smart_upscale.jpg',
      description: 'Currier House is connected to the QRAC, the athletic center for students in the Radcliffe Quadrangle.',
      address: '64 Linnaean Street',
      founding: 1970,
      logourl: 'https://static.hwpi.harvard.edu/files/styles/os_files_small/public/osl/files/currier-shield.png?m=1515604329&itok=MNmISr1H',
    },
    {
      name: 'Dunster',
      imgurl: 'https://i1.wp.com/news.harvard.edu/wp-content/uploads/2015/08/082715_dunster_ks_493_6051.jpg?resize=605%2C403&ssl=1',
      description: 'Dunster House claims the moose as its mascot.',
      address: '945 Memorial Drive',
      founding: 1930,
      logourl: 'https://static.hwpi.harvard.edu/files/styles/os_files_small/public/osl/files/dunster-shield.png?m=1515604329&itok=G4hGkDoS',
    },
    {
      name: 'Eliot',
      imgurl: 'https://college.harvard.edu/sites/default/files/EliotHouse.JPG',
      description: 'Eliot House is well-known for one of the fanciest formals on campus, Fete',
      address: '101 Dunster Street',
      founding: 1930,
      logourl: 'https://static.hwpi.harvard.edu/files/styles/os_files_small/public/osl/files/eliot-shield.png?m=1515604329&itok=otCZ1Dze',
    },
    {
      name: 'Kirkland',
      imgurl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Kirkland_House_Courtyard.jpg/1200px-Kirkland_House_Courtyard.jpg',
      description: 'Kirkland House is a small upperclassman house that was once home to Mark Zuckerberg, founder of Facebook.',
      address: '95 Dunster Street',
      founding: 1931,
      logourl: 'https://static.hwpi.harvard.edu/files/styles/os_files_small/public/osl/files/kirkland-shield.png?m=1515604329&itok=xsXRFJ9u',
    },
    {
      name: 'Leverett',
      imgurl: 'https://s3.amazonaws.com/thumbnails.thecrimson.com/photos/2015/03/09/205658_1304826.jpg.1500x1000_q95_crop-smart_upscale.jpg',
      description: 'Leverett House once claimed what is now Stone Hall of Quincy as its own.',
      address: '28 DeWolfe Street',
      founding: 1931,
      logourl: 'https://static.hwpi.harvard.edu/files/styles/os_files_small/public/osl/files/leverett-shield.png?m=1515604329&itok=VnFC_3nu',
    },
    {
      name: 'Lowell',
      imgurl: 'https://harvardmagazine.com/sites/default/files/styles/4x3_main/public/img/article/0615/Lowell.jpg?itok=fU3O2gAN',
      description: 'Students in Lowell House currently live in the Inn on Mass. Avenue as their house is being renovated.',
      address: '1201 Massachusetts Avenue',
      founding: 1930,
      logourl: 'https://static.hwpi.harvard.edu/files/styles/os_files_small/public/osl/files/lowell-shield.png?m=1515604329&itok=CgUK2PMy',
    },
    {
      name: 'Mather',
      imgurl: 'https://features.thecrimson.com/2014/housing-market/img/mather/thumbs_full/2.jpg',
      description: "Mather House's towers, built in 1970, are sometimes cropped out of postcards as many consider them too modern.",
      address: '10 Cowperthwaite Street',
      founding: 1970,
      logourl: 'https://static.hwpi.harvard.edu/files/styles/os_files_small/public/osl/files/mather-shield.png?m=1515604329&itok=GTyNn05z',
    },
    {
      name: 'Pforzheimer',
      imgurl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Moors_Hall_2.jpg/1200px-Moors_Hall_2.jpg',
      description: 'Pforzheimer is the newest upperclassman house and has spacious accommodations for students.',
      address: '56 Linnaean Street',
      founding: 1996,
      logourl: 'https://static.hwpi.harvard.edu/files/styles/os_files_small/public/osl/files/pforzheimer-shield.png?m=1515604329&itok=RbyekGvv',
    },
    {
      name: 'Quincy',
      imgurl: 'http://static.projects.iq.harvard.edu/files/styles/os_files_xxlarge/public/quincyhouse/files/stone_hall_1.jpg?m=1515697785&itok=kmJGDluh',
      description: 'In 2018, Quincy House won its first ever Straus Cup, the coveted Intramural Sports trophy.',
      address: '58 Plympton Street',
      founding: 1959,
      logourl: 'https://static.hwpi.harvard.edu/files/styles/os_files_small/public/osl/files/quincy-shield.png?m=1515604329&itok=XvUjsoxa',
    },
    {
      name: 'Winthrop',
      imgurl: 'https://www.harvardmagazine.com/sites/default/files/styles/4x3_main/public/img/article/0917/Vanderwarker%20pdv_2524_0.jpg?itok=e5lDAd6q',
      description: 'Winthrop House was once home to former U.S. President John F. Kennedy.',
      address: '32 Mill Street',
      founding: 1931,
      logourl: 'https://static.hwpi.harvard.edu/files/styles/os_files_small/public/osl/files/winthrop-shield.png?m=1515604329&itok=1GJIKfuF',
    },
  ];
  // eslint-disable-next-line guard-for-in
  for (const key in dict) {
    db.run('INSERT INTO Houses(name, imgurl, description, address, founding, logourl) VALUES(?, ?, ?, ?, ?, ?)', [dict[key].name, dict[key].imgurl, dict[key].description, dict[key].address, dict[key].founding, dict[key].logourl]);
  }
});
