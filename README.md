# Connecting Harvard's Past to its Present

Heroku: https://connecting-harvard.herokuapp.com/

To run by downloading code and from command line, replace 
`const hostname = (process.argv.length === 3) ? process.argv[2] : '0.0.0.0';
const port = process.env.PORT || 8080;`
with 
`const hostname = process.argv[2]; 
const port = process.argv[3]` 
and enter on command line: `node app.js 127.0.0.1 3000` (or whatever hostname and port you wish to use). 

Matthew Miller\
Ben Kaplan\
Eliza Scharfstein\
Kyle Massimilian

<matthewmiller01@college.harvard.edu>\
<bkaplan@college.harvard.edu>\
<eliza_scharfstein@college.harvard.edu>\
<kmassimilian@college.harvard.edu>


We want to show current students and alumni alike what it has been like to live at Harvard since the early 1900s. In order to do so, we want to create a website that chronicles the history of each house and how it has changed over the years. Our site is extremely dynamic, in that very little is hardcoded and instead mostly everything relies on the database and API's. Furthermore, the site is a living piece of history-- users can comment and share their stories about their living experiences, and thus, we all create the history of the Harvard Houses, together. 

Dive in and explore the houses, rooms, and featured parts of the houses, by browsing or searching from the home page. For more general overview of the houses and certain rooms, check out each house page for a timeline (with temporally relevant New York Times articles for some years), Hollis resources, and all the rooms in that house (true to the houses real floorplans!). See featured rooms for before and after images of these spaces that housed famous people or traditions. Enter rooms' pages to explore what fellow former and current students say about that room-- and contribute yourself via the comment section. All users can explore the site, but only those who have accounts can comment on rooms' pages to share their own experience living in that space. 
 
