const fs = require('fs');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('ConnectingPG.db', sqlite3.OPEN_READWRITE, (dict, err) => {
  if(err){
    throw err;
  }
//taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
dict = [
  {
    //will use join to say the alias of house is "name" in the house table, can join
    "name": "FDR Suite",
    "description": "Once home to former U.S. President Franklin Delano Roosevelt, the FDR Suite is now open for Board Game Nights and special events like Harvard Thanksgiving.",
    "room": "941",
    "beforeImg": "http://www.fdrsuite.org/IMAGES/B-22.jpg",
    "afterImg": "http://fdrfoundation.org/wp-content/uploads/2016/06/fdrsuite10_1200.jpg"
  }
]
for(let key in dict){
  //gets the houseId using its name since the two tables are linked by houseId
  db.get('SELECT id FROM Rooms WHERE name = ? AND houseId = 1', dict[key].room, (err, room) => {
    if(err){
      throw err;
    }
    db.run('INSERT INTO featuredRoom(roomId, name, description, beforeImg, afterImg) VALUES(?, ?, ?, ?, ?)', [room.id, dict[key].name, dict[key].description, dict[key].beforeImg, dict[key].afterImg]);
})
}
})
