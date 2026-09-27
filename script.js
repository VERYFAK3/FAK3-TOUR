const events=[
{n:"01",date:"OCT 09",club:"CAKESHOP",artist:"MITSU",track:"LIGHTS",world:"game",cta:"START GAME"},
{n:"02",date:"OCT 16",club:"HENZ",artist:"0SIGGY",track:"ITAEWON BOUNCE",world:"magazine",cta:"OPEN ISSUE"},
{n:"03",date:"OCT 23",club:"SHELTER",artist:"VITALINE",track:"GO!",world:"cctv",cta:"ACCESS CAMERA"},
{n:"04",date:"OCT 30",club:"LUKA",artist:"LIL CHERRY",track:"BOULANGERIE",world:"horror",cta:"PLAY TAPE"},
{n:"05",date:"NOV 06",club:"FLAC",artist:"FEROZZLESS",track:"4AM",world:"tv",cta:"WATCH CH.05"},
{n:"06",date:"NOV 13",club:"UNDERCITY",artist:"BRYN, FRESH AIR",track:"THANK U FOR BEING HERE",world:"fight",cta:"ENTER THE RING"},
{n:"07",date:"NOV 21",club:"MING",artist:"NINEORZERO",track:"IN2U",world:"flyer",cta:"입장하기"},
{n:"08",date:"NOV 27",club:"BOLERO",artist:"KIRIN",track:"CINNAMON BABY",world:"ad",cta:"BUY NOW"}
];
// V0: all chapters intentionally locked. Later we connect dates, pre-saves and archives here.
document.querySelector("#events").innerHTML=events.map(e=>`
<article class="event">
 <div class="num">${e.n}</div><div class="date">${e.date}</div>
 <div><h2>${e.club}</h2><p class="track">${e.artist} — ${e.track}</p></div>
 <div class="action"><div class="status">[ LOCKED ]</div><button class="${e.world}" disabled>${e.cta}</button></div>
</article>`).join("");