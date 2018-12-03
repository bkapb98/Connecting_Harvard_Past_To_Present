for(let i = 1; i <= 6; i++)
{
  dict.push({house: 'Leverett', entryway: 'McKinlock A', number: 100+i})
}
for(let i = 1; i <= 34; i++)
{
  dict.push({house: 'Leverett', entryway: 'McKinlock B', number: 200+i})
}
for(let i = 1; i <= 32; i++)
{
  dict.push({house: 'Leverett', entryway: 'McKinlock C', number: 300+i})
}
for(let i = 1; i <= 31; i++)
{
  dict.push({house: 'Leverett', entryway: 'McKinlock D', number: 400+i})
}
const leverett = 'F15F25F35F47F58F68F78F87F98G15G25G35G47G59G67G79G87G99';
// splits this into a list of strings of length three
const levs = (leverett.match(/.{1,3}/g));
for (let i = 0; i < levs.length; i++) {
  for (let j = 1; j <= levs[i].charAt(2); j++) {
    dict.push({ house: 'Leverett', entryway: levs[i].charAt(0) + " Tower", number: levs[i].charAt(1) + j });
  }
}
for(let i = 100; i <= 109; i++)
{
  dict.push({house: 'Leverett', entryway: 'F Tower', number: i})
}
for(let i = 100; i <= 119; i++)
{
  dict.push({house: 'Leverett', entryway: 'G Tower', number: i})
}
