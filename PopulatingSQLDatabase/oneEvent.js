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
    "house": "Adams",
    "date": "June 1997",
    "name": "Dining Hall Renovation",
    "description": "Harvard University Dining Services embarked on a 10.5 week project to renovate Adams House's 60-year-old dining hall, a $3 million undertaking.",
    "source": "https://search-proquest-com.ezp-prod1.hul.harvard.edu/docview/215882869?accountid=11311&rfr_id=info%3Axri%2Fsid%3Aprimo"
  },
  {
    "house": "Cabot",
    "date": "September 2018",
    "name": "Flood in the Dining Hall",
    "description": "After a torrentious downpour, Cabot's dining hall flooded, leading to the closing of the dining hall as maintenance workers combatted the flood.",
    "source": "Lewis, I. M. (2018, Sep 18). Cabot house dining hall floods, forming ‘Second aquarium’. University Wire Retrieved from http://search.proquest.com.ezp-prod1.hul.harvard.edu/docview/2108732546?accountid=11311"
  },
  {
    "house": "Currier",
    "date": "1982",
    "name": "First Straus Cup",
    "description": "In this year, Currier won its first ever Straus Cup, the trophy awarded to the house that wins the most Intramural Sports points.",
    "source": "https://recreation.gocrimson.com/recreation/intramurals/Navigation_Bar_Items/strauscup"
  },
  {
    "house": "Dunster",
    "date": "1930",
    "name": "Dunster's First House Master",
    "description": "Chester Noyes Greenough was made Master of Dunster House, a position that has now been renamed Faculty Dean.",
    "source": "https://dunster.harvard.edu/history/"
  },
  {
    "house": "Eliot",
    "date": "July 1961",
    "name": "Eliot House Crew Triumphs",
    "description": "The Eliot House crew team defeated the Kent School of Connecticut's team, to advance to face the University of London's team in the Thames Challenge Cup.",
    "source": "Eliot house of harvard beats kent eight in royal henley. (1961, Jul 08). New York Times (1923-Current File) Retrieved from http://search.proquest.com.ezp-prod1.hul.harvard.edu/docview/115417349?accountid=11311."
  },
  {
    "house": "Kirkland",
    "date": "1762",
    "name": "Kirkland House's Library Completed",
    "description": "In 1762, John Hicks completed what is now the Kirkland House library, making it one of the twenty-one pre-Revolutionary houses to exist in Cambridge.",
    "source": "http://nrs.harvard.edu/urn-3:FHCL:30195606"
  },
  {
    "house": "Leverett",
    "date": "March 1964",
    "name": "Malcolm X Speaks at Leverett",
    "description": "Famous civil rights leader Malcolm X delivered a speech in Leverett House about the future of black community politics.",
    "source": "Shabazz, Betty, & X, Malcolm. (1993). Malcolm X at the Leverett House Forum. Journal of Blacks in Higher Education, (1), 35-37."
  },
  {
    "house": "Lowell",
    "date": "March 1998",
    "name": "Diana Eck named Lowell Master",
    "description": "Harvard names Professor Diana Eck as Lowell's new master. Eck was a professor of comparative religion who went on to serve until 2018.",
    "source": "Howard, L., & Arlyn, T. G. (1998, Apr 13). Lowell house gets modern. Newsweek, 131, 6. Retrieved from http://search.proquest.com.ezp-prod1.hul.harvard.edu/docview/214314772?accountid=11311"
  },
  {
    "house": "Mather",
    "date": "February 2018",
    "name": "Controversial T-Shirt",
    "description": "Mather released a house t-shirt with a design of famous rapper Kendrick Lamar replaced with a gorilla, which many immediately rejected as racist toward Lamar.",
    "source": "Flanagan, W. S. (2018, Feb 14). Mather house committee faces backlash over shirt design. University Wire Retrieved from http://search.proquest.com.ezp-prod1.hul.harvard.edu/docview/2001678004?accountid=11311"
  },
  {
    "house": "Pforzheimer",
    "date": "1901",
    "name": "First Residents",
    "description": "Students first started living in what is now Pforzheimer House, but at the time these were Radcliffe College students, not Harvard College students as women were not yet allowed to attend Harvard.",
    "source": "https://pfoho.harvard.edu/pfolklore-and-history"
  },
  {
    "house": "Quincy",
    "date": "2018",
    "name": "First Straus Cup",
    "description": "Quincy won its first ever IM championship.",
    "source": "Matthew, a resident of Quincy."
  },
  {
    "house": "Winthrop",
    "date": "November 1932",
    "name": "Loss to Yale Football",
    "description": "Winthrop House football loses to Yale's team, 7 to 0, after a touchdown by Pinky Pinkham.",
    "source": "Special to THE NEW,YORK TIMES. (1932, Nov 16). YALE JUNIORS DEFEAT WINTHROP HOUSE, 7-0. New York Times (1923-Current File) Retrieved from http://search.proquest.com.ezp-prod1.hul.harvard.edu/docview/99777544?accountid=11311"
  }
]
  for(let key in dict)
  {
    db.get('SELECT houseId FROM Houses WHERE houseName = ?', dict[key].house, (err, house) => {
      console.log(house)
      if(err)
      {
        throw err;
      }
      console.log(house.houseId)
      console.log(dict[key].name)
      console.log(dict[key].date)
      console.log(dict[key].description)
      console.log(dict[key].name)
      console.log(dict[key].description)
      console.log(dict[key].source)
      db.run('INSERT INTO Events(houseId, date, eventName, description, source) VALUES(?, ?, ?, ?, ?)', [house.houseId, dict[key].date, dict[key].name, dict[key].description, dict[key].source]);
  })
}
})
