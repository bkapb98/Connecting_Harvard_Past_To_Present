const fs = require("fs");
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('connectingPG.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err){
    throw err;
  }
})
var dict = [];
var names = ["Adams", "Cabot", "Currier", "Dunster", "Eliot", "Kirkland", "Leverett",
"Lowell", "Mather", "Pforzheimer", "Quincy", "Winthrop"];
var imgurls = ["https://i0.wp.com/news.harvard.edu/wp-content/uploads/2018/04/adams-1692500_mini.jpg?resize=1600%2C900&ssl=1",
"https://static.projects.iq.harvard.edu/files/styles/os_slideshow_16%3A9_980/public/cabot/files/cabotcover1.jpg?m=1515613588&itok=85ZSNBUG",
"https://s3.amazonaws.com/thumbnails.thecrimson.com/photos/2018/03/01/234610_1328654.jpg.600x600_q95_crop-smart_upscale.jpg",
"https://i1.wp.com/news.harvard.edu/wp-content/uploads/2015/08/082715_dunster_ks_493_6051.jpg?resize=605%2C403&ssl=1",
"https://college.harvard.edu/sites/default/files/EliotHouse.JPG",
"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Kirkland_House_Courtyard.jpg/1200px-Kirkland_House_Courtyard.jpg",
"https://s3.amazonaws.com/thumbnails.thecrimson.com/photos/2015/03/09/205658_1304826.jpg.1500x1000_q95_crop-smart_upscale.jpg",
"https://harvardmagazine.com/sites/default/files/styles/4x3_main/public/img/article/0615/Lowell.jpg?itok=fU3O2gAN",
"https://features.thecrimson.com/2014/housing-market/img/mather/thumbs_full/2.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Moors_Hall_2.jpg/1200px-Moors_Hall_2.jpg",
"http://static.projects.iq.harvard.edu/files/styles/os_files_xxlarge/public/quincyhouse/files/stone_hall_1.jpg?m=1515697785&itok=kmJGDluh",
"https://www.harvardmagazine.com/sites/default/files/styles/4x3_main/public/img/article/0917/Vanderwarker%20pdv_2524_0.jpg?itok=e5lDAd6q"];
var descriptions = ["", "", "", "", "", "", "", "", "", "", "", ""];
var addresses = ["26 Plympton Street", "60 Linnaean Street", "64 Linnaean Street",
"945 Memorial Drive", "101 Dunster Street", "95 Dunster Street",
"28 DeWolfe Street", "1201 Massachusetts Avenue", "10 Cowperthwaite Street",
"56 Linnaean Street", "58 Plympton Street", "32 Mill Street"];
var foundings = [1931, 1970, 1970, 1930, 1930, 1931, 1931,
1930, 1970, 1996, 1959, 1931];
for(var i = 0; i<12; i++)
{
  db.run('INSERT INTO Houses(name, imgurl, description, address, founding) VALUES(?, ?, ?, ?, ?)', [names[i], imgurls[i], descriptions[i], addresses[i], foundings[i]]);
}
