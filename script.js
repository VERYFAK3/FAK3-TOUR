const events=[
{n:"01",date:"OCT 09",place:"CAKESHOP",artist:"MITSU",track:"LIGHTS",media:"FLYER / VIDEO GAME",album:true},
{n:"02",date:"OCT 16",place:"HENZ",artist:"0SIGGY",track:"ITAEWON BOUNCE",media:"FLYER / MAGAZINE",album:true},
{n:"03",date:"OCT 23",place:"SHELTER",artist:"VITALINE",track:"GO!",media:"FLYER / CCTV",album:true},
{n:"04",date:"OCT 30",place:"LUKA",artist:"LIL CHERRY",track:"BOULANGERIE",media:"FLYER / HORROR MOVIE",album:true},
{n:"05",date:"NOV 06",place:"FLAC",artist:"FEROZZLESS",track:"4AM",media:"FLYER / TV SHOW",album:true},
{n:"06",date:"NOV 13",place:"UNDERCITY",artist:"BRYN, FRESH AIR",track:"THANK U FOR BEING HERE",media:"FLYER / WRESTLING",album:true},
{n:"07",date:"NOV 21",place:"MING",artist:"NINEORZERO",track:"IN2U",media:"FLYER / OLD KOREAN",album:true},
{n:"08",date:"NOV 27",place:"BOLERO",artist:"KIRIN",track:"CINNAMON BABY",media:"FLYER / ADVERTISING",album:true},
{n:"09",date:"TBA",place:"SEOUL COMMUNITY RADIO",artist:"BOO THE BAND",track:"HOODANTHEM",media:"FLYER / LOTTERY TICKET",album:true}
];
document.querySelector("#blocks").innerHTML=Array.from({length:9},()=>"<i></i>").join("");
document.querySelector("#events").innerHTML=events.map(e=>`<article class="event"><div class="event-id">${e.n}<br>${e.date}</div><div class="media"><span>${e.media}</span></div><div class="info"><small>SEOUL / RELEASE</small><h2>${e.place}</h2><p>${e.artist}<br>${e.track}</p></div><button class="action" disabled>LOCKED</button></article>`).join("");