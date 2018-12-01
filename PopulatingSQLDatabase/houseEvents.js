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
      house: 'Adams',
      date: 'June 1997',
      name: 'Dining Hall Renovation',
      description: "Harvard University Dining Services embarked on a 10.5 week project to renovate Adams House's 60-year-old dining hall, a $3 million undertaking.",
      source: 'https://search-proquest-com.ezp-prod1.hul.harvard.edu/docview/215882869?accountid=11311&rfr_id=info%3Axri%2Fsid%3Aprimo',
    },
    {
      house: 'Cabot',
      date: 'September 2018',
      name: 'Flood in the Dining Hall',
      description: 'After a torrentious downpour, Cabot\'\s dining hall flooded, leading to the closing of the dining hall as maintenance workers combatted the flood.',
      source: 'Lewis, I. M. (2018, Sep 18). Cabot house dining hall floods, forming ‘Second aquarium’. University Wire Retrieved from http://search.proquest.com.ezp-prod1.hul.harvard.edu/docview/2108732546?accountid=11311',
    },
    {
      house: 'Currier',
      date: '1982',
      name: 'First Straus Cup',
      description: 'In this year, Currier won its first ever Straus Cup, the trophy awarded to the house that wins the most Intramural Sports points.',
      source: 'https://recreation.gocrimson.com/recreation/intramurals/Navigation_Bar_Items/strauscup',
    },
    {
      house: 'Dunster',
      date: '1930',
      name: 'Dunster\'\s First House Master',
      description: 'Chester Noyes Greenough was made Master of Dunster House, a position that has now been renamed Faculty Dean.',
      source: 'https://dunster.harvard.edu/history/',
    },
    {
      house: 'Eliot',
      date: 'July 1961',
      name: 'Eliot House Crew Triumphs',
      description: 'The Eliot House crew team defeated the Kent School of Connecticut\'\s team, to advance to face the University of London\'\s team in the Thames Challenge Cup.',
      source: 'Eliot house of harvard beats kent eight in royal henley. (1961, Jul 08). New York Times (1923-Current File) Retrieved from http://search.proquest.com.ezp-prod1.hul.harvard.edu/docview/115417349?accountid=11311.',
    },
    {
      house: 'Kirkland',
      date: '1762',
      name: 'Kirkland House Library Completed',
      description: 'In 1762, John Hicks completed what is now the Kirkland House library, making it one of the twenty-one pre-Revolutionary houses to exist in Cambridge.',
      source: 'http://nrs.harvard.edu/urn-3:FHCL:30195606',
    },
    {
      house: 'Leverett',
      date: 'March 1964',
      name: 'Malcolm X Speaks at Leverett',
      description: 'Famous civil rights leader Malcolm X delivered a speech in Leverett House about the future of black community politics.',
      source: 'Shabazz, Betty, & X, Malcolm. (1993). Malcolm X at the Leverett House Forum. Journal of Blacks in Higher Education, (1), 35-37.',
    },
    {
      house: 'Lowell',
      date: 'March 1998',
      name: 'Diana Eck named Lowell Master',
      description: 'Harvard names Professor Diana Eck as Lowell\'\s new master. Eck was a professor of comparative religion who went on to serve until 2018.',
      source: 'Howard, L., & Arlyn, T. G. (1998, Apr 13). Lowell house gets modern. Newsweek, 131, 6. Retrieved from http://search.proquest.com.ezp-prod1.hul.harvard.edu/docview/214314772?accountid=11311',
    },
    {
      house: 'Mather',
      date: 'February 2018',
      name: 'Controversial T-Shirt',
      description: 'Mather released a house t-shirt with a design of famous rapper Kendrick Lamar replaced with a gorilla, which many immediately rejected as racist toward Lamar.',
      source: 'Flanagan, W. S. (2018, Feb 14). Mather house committee faces backlash over shirt design. University Wire Retrieved from http://search.proquest.com.ezp-prod1.hul.harvard.edu/docview/2001678004?accountid=11311',
    },
    {
      house: 'Pforzheimer',
      date: '1901',
      name: 'First Residents',
      description: 'Students first started living in what is now Pforzheimer House, but at the time these were Radcliffe College students, not Harvard College students as women were not yet allowed to attend Harvard.',
      source: 'https://pfoho.harvard.edu/pfolklore-and-history',
    },
    {
      house: 'Quincy',
      date: '2018',
      name: 'First Straus Cup',
      description: 'Quincy won its first ever IM championship.',
      source: 'Matthew, a resident of Quincy.',
    },
    {
      house: 'Winthrop',
      date: 'November 1932',
      name: 'Loss to Yale Football',
      description: 'Winthrop House football loses to Yale\'\s team, 7 to 0, after a touchdown by Pinky Pinkham.',
      source: 'Special to THE NEW,YORK TIMES. (1932, Nov 16). YALE JUNIORS DEFEAT WINTHROP HOUSE, 7-0. New York Times (1923-Current File) Retrieved from http://search.proquest.com.ezp-prod1.hul.harvard.edu/docview/99777544?accountid=11311',
    },
    {
    // will use join to say the alias of house is "name" in the house table, can join
      house: 'Adams',
      date: '1893',
      name: 'Claverly Hall Built',
      description: 'Claverly featured steam heat and a swimming pool which has been repurposed to a theater. It was the first incredibly luxurious Gold Coast dorm, a collection of living spaces for wealthy students.',
      source: 'https://adamshouse.harvard.edu/house-history',
    },
    {
      house: 'Cabot',
      date: 'January 2014',
      name: 'Cabot Dean named College Dean',
      description: 'The Faculty Dean (then known as Master) of Cabot House, Rakesh Khurana, is named Dean of Harvard College. Khurana had become Faculty Dean of Cabot in 2010.',
      source: 'https://search-proquest-com.ezp-prod1.hul.harvard.edu/docview/1498242455?accountid=11311&rfr_id=info%3Axri%2Fsid%3Aprimo',
    },
    {
      house: 'Currier',
      date: '1975',
      name: 'Bill Gates and Steve Ballmer',
      description: 'As Steve Ballmer reflects in a 1997 interview, he met Microsoft founder Bill Gates as sophomores in Currier House in 1975. Ballmer would go on to become CEO of Microsoft. They lived down the hall from each other and both were into "math and science-type stuff"',
      source: 'Whitaker, Mark. “How We Did It.” Newsweek, vol. 129, no. 25, June 1997, p. 78. EBSCOhost, ezp-prod1.hul.harvard.edu/login?url=http://search.ebscohost.com/login.aspx?direct=true&db=bth&AN=9706246969&site=ehost-live&scope=site.',
    },
    {
      house: 'Dunster',
      date: '1972',
      name: 'Film Society',
      description: 'In 1972, the Dunster House Film Society was founded to screen movies in Dunster House as well as in "larger university venues" like the Science Center.',
      source: 'Dunster House Film Society. (1972). General Information by and about the Dunster House Film Society, 1972-1979.',
    },
    {
      house: 'Eliot',
      date: 'August 1974',
      name: 'Marriage in Eliot',
      description: 'Laura Gordon and Philip Fisher\'\s marriage ceremony is conducted by Rabbi Gerald Zelermyer at Eliot House. Though neither attended Harvard, Mrs. Fisher taught Slavic languages and literatures at Harvard.',
      source: 'Laura M. gordon, philip fisher wed. (1974, Aug 26). New York Times (1923-Current File) Retrieved from http://search.proquest.com.ezp-prod1.hul.harvard.edu/docview/119928889?accountid=11311.',
    },
    {
      house: 'Kirkland',
      date: 'May 1932',
      name: 'Kirkland Falls to Andover',
      description: 'Kirkland House\'\s baseball team gets destroyed by Andover Academy\'\s prep school team, 23-4.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest99693231&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Leverett',
      date: 'January 1932',
      name: 'Basketball Championship',
      description: 'Leverett wins the championship of the Harvard House Basketball League after defeating Winthrop, 12-10. The victory was made possible by two last-minute free throws.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest99733668&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Lowell',
      date: 'March 1931',
      name: 'Lowell Wins Swim Meet',
      description: 'In the first interhouse Winter sport matchup between Lowell and Dunster, Lowell wins this swim meet by a score of 34 to 28.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest99384139&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Mather',
      date: 'May 1967',
      name: 'Construction Begins',
      description: 'Construction on Mather House begins, with a price-tag of $8 million. At the time it would be the tenth "educational and social center" for Harvard undergrads, as described by the New York Times. Approximately 400 students were expected to be housed in Mather.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest118058250&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Pforzheimer',
      date: 'March 2018',
      name: 'Best Cinematography Runner-Up',
      description: 'According to the Harvard Crimson, Pforzheimer wins runner-up for Best Cinematography in its Housing Day video, which centered around the popular TV show "Stranger Things".',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest2016111846&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Quincy',
      date: 'June 1997',
      name: 'Marriage in Quincy Library',
      description: 'Julia Rubin and Gregory Stankiewicz are married by Reverend Janet Legro in the Quincy House Library. Mrs. Rubin attended Harvard, where she graduated cum laude and was then a Ph.D. candidate in organizational behavior.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest109725780&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Winthrop',
      date: 'May 2015',
      name: 'First Latina Portrait',
      description: 'Harvard unveils an official portrait of Rosie Rios, who lived in Winthrop while at Harvard. She graduated in 1987 and was then the Treasurer of the United States when the portrait was created, the first portrait of a Latina to hang on a wall at Harvard College.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest1680767907&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
    // will use join to say the alias of house is "name" in the house table, can join
      house: 'Adams',
      date: '1990',
      name: 'Pool Closed',
      description: 'The Adams Pool is closed indefinitely, after being known for nude, coeducational swimming between the hours of 3 and 4 PM. This move was much to the chagrin of many Adams students and tutors',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest140577107&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Cabot',
      date: 'January 1989',
      name: 'Marriage in Cabot House',
      description: 'Linda Cabot Black, the daughter of Thomas Dudley Cabot for whom Cabot House was named, marries Roger E. Clapp, with the ceremony conducted in Cabot House.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest110218986&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Currier',
      date: 'September 2017',
      name: 'Disease in Currier',
      description: 'Hand, Foot, and Mouth Disease, whose symptoms include mouth sores and body rashes, reached Currier in the fall of 2017, as confirmed by Harvard University Health Services spokesman Michael Perry.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest1990744023&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Dunster',
      date: 'November 1935',
      name: 'Janitor Assaulted',
      description: 'Frank Foster, 67, is assaulted by Harvard student B.Y. Ryan, leaving him in critical condition with a concussion of the brain. The assault occurred after a drinking party in Dunster House.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest101304561&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Eliot',
      date: 'May 1930',
      name: 'Eliot Named',
      description: 'Eliot House is slated to be named for Charles W. Eliot, who presided over Harvard for 40 years and brought Harvard to world fame.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest98979540&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Kirkland',
      date: 'May 1930',
      name: 'Kirkland Named',
      description: 'Kirkland House is named in memory of John Thornton Kirkland, who presided over Harvard from 1810 to 1828 and brought Harvard from a college to a university.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest98979540&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Leverett',
      date: 'May 1930',
      name: 'Leverett Named',
      description: 'Leverett House is named in honor of John Leverett, who presided over Harvard College from 1707-1724. Leverett would be composed of McKinlock Hall, a freshman dorm at the time, and a building to be raised next to it which would later become Quincy House\'\s Stone Hall',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest98979540&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Lowell',
      date: '2008',
      name: 'Bells to be Removed',
      description: 'Lowell\'\s bells, which had been ringing from its belltower on Sundays and during commencement for over 70 years, are removed to be returned to the Russian monastery from which they were originally removed and brought to Harvard.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest848186969&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Mather',
      date: '2017',
      name: 'Tuberculosis Hits Mather',
      description: 'Harvard University Health Services director Paul J. Barreira finds cases of tuberculosis among Mather residents, adding more cases to a year of odd diseases ravaging Harvard undergraduates.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest1990744023&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Pforzheimer',
      date: 'January 2018',
      name: 'Associate Dean to Live in Pforzheimer',
      description: 'Recently named Associate Dean of Students Lauren E. Brandt `01 is assigned to live in Pforzheimer House.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest1986790177&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Quincy',
      date: 'May 1980',
      name: 'Quincy Film Society Trouble',
      description: 'The co-presidents of the Quincy Film Society were arrested after showing a pornographic film to around 100 paying customers in the Quincy House dining room, charged with disseminating obscene material and tried by a grand jury.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest121067990&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Winthrop',
      date: 'May 1930',
      name: 'Winthrop Named',
      description: 'Winthrop is named in honor of John Winthrop, President of Harvard from 1773-1774. It would be composed of former freshman dormitories Gore and Standish Hall.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest98979540&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
    // will use join to say the alias of house is "name" in the house table, can join
      house: 'Adams',
      date: '1986',
      name: 'Leonard Bernstein Speech',
      description: 'Leonard Bernstein, the iconic music director of the New York Philharmonic and a Harvard alumni of the class of 1939, delivered a speech to 70 undergraduates at 2 AM that lasted 90 minutes. In his speech, the famous musician criticized Ronald Reagan\'\s campaign of disinformation. He titled his speech "Truth in a Time of War" and demanded that 2 bottles of scotch be present for those who attended the speech.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_gale_litrc188952157&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Cabot',
      date: '1989',
      name: 'Citadel Founder in Cabot',
      description: 'Kenneth Griffin, a Cabot House resident, graduates from Harvard. After beginning to trade convertible bonds from his dorm room in Cabot, Griffin went on to found Citadel, a Chicago-based financial institution, right after graduating in 1989.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest1357523740&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Currier',
      date: 'September 1968',
      name: 'Money Donated for Currier',
      description: 'Mrs. Alisa Mellon Bruce donates $5.4 millino to Radcliffe College, the largest donation in Radcliffe\'\s history, to honor her daughter, Audrey Currier. Currier died in a plane crash in the Caribbean. The money donated would be used to build Currier House, which would initially house 240 female students as a dorm at Radcliffe College.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest118236753&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Dunster',
      date: 'October 2004',
      name: 'Supporting Voter Participation',
      description: 'In the month before the 2004 presidential election, Dunster House pays for the printing of shirts encouraging voter participation to be sent to young, potential voters at Florida State University, who would be voting in an important swing state. The effort was described as nonpartisan',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_gale_hrca123375595&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Eliot',
      date: '1959',
      name: 'Unabomber Lives in Eliot',
      description: 'Ted Kaczynski, later known as the "Unabomber" for the bombs he set off around the U.S., would live in Eliot\'\s N entryway after entering into Harvard at age 16. His roommates would describe his room as incredibly dirty, so much so that the famed Master of Eliot House, John Finley, had to be called in to intervene.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_gale_ofa18169307&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Kirkland',
      date: '2004',
      name: 'Zuckerberg Founds Facebook',
      description: 'While living in Kirkland House in 2004, 19-year-old Mark Zuckerberg founds Facebook from his dorm room as a sophomore.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest756196995&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Leverett',
      date: '1980',
      name: 'Yo-Yo Ma Hosts Waltz Party',
      description: 'World-famous cellist Yo-Yo Ma, a graduate of Harvard, hosts an old-fashioned waltz party in Leverett in which he played his cello for students.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_gale_ofa193629845&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Lowell',
      date: '2017',
      name: 'Lowell Alum Named Harvard Law Review President',
      description: 'Imelme Umana, a former resident of Lowell House during her undergraduate time at Harvard, becomes the first black woman to be elected as the president of the Harvard Law Review. Former U.S. President Barack Obama was the first black man elected president of this prestigious organization.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest1874018443&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Mather',
      date: '2007',
      name: 'Dining Hall Green-Certified',
      description: 'The Mather Dining Hall, shared with that of Dunster, becomes Leadership in Energy and Environmental Design (LEED) Certification from the US Green Building Council. To reach this status, Mather incorporated more energy-efficient equipment in its tray conveyor and garbage disposal systems.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_gale_ofg159232146&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Pforzheimer',
      date: 'March 2018',
      name: '"In Defense of the Quad" Published',
      description: 'Pforzheimer resident Robert Miranda publishes "In Defense of the Quad", an editorial in the Harvard Crimson that touts the benefits of Quad houses like Pforzheimer such as its spacious rooms, party spaces, and modern features. This article served as a scathing refutation to those who maintain that river houses are superior to quad houses.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest2010647373&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Quincy',
      date: 'September 2004',
      name: 'Dining Hall Renovated',
      description: 'Quincy adds a modern dining hall featuring a deli bar and updated technologies, making it the 10th Harvard house dining hall to be renovated in the last five years.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_proquest229301619&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    },
    {
      house: 'Winthrop',
      date: 'October 2004',
      name: 'Voter Turnout in Swing States',
      description: 'The dean of Winthrop House donates $600 to print 800 t-shirts that state "I DECIDE," 400 of which were sent to students at Penn State University, a swing state in which every vote was important leading into the 2004 presidential election.',
      source: 'https://hollis.harvard.edu/primo-explore/fulldisplay?docid=TN_gale_hrca123375595&context=PC&vid=HVD2&search_scope=everything&tab=everything&lang=en_US',
    }
  ];
  // eslint-disable-next-line no-restricted-syntax
  for (const key in dict) {
  // gets the houseId using its name since the two tables are linked by houseId
    // eslint-disable-next-line no-shadow
    db.get('SELECT id FROM Houses WHERE name = ?', dict[key].house, (err, house) => {
      if (err) {
        throw err;
      }
      db.run('INSERT INTO Events(houseId, date, eventName, description, source) VALUES(?, ?, ?, ?, ?)', [house.id, dict[key].date, dict[key].name, dict[key].description, dict[key].source]);
    });
  }
});
