const events=[
["01","OCT 09","CAKESHOP","MITSU","LIGHTS","FAKE VIDEO GAME","START GAME"],
["02","OCT 16","HENZ","0SIGGY","ITAEWON BOUNCE","FAKE MAGAZINE","OPEN ISSUE"],
["03","OCT 23","SHELTER","VITALINE","GO!","FAKE CCTV / CAMERA","ACCESS CAMERA"],
["04","OCT 30","LUKA","LIL CHERRY","BOULANGERIE","FAKE HORROR MOVIE","PLAY TAPE"],
["05","NOV 06","FLAC","FEROZZLESS","4AM","FAKE TV SHOW","WATCH CH.05"],
["06","NOV 13","UNDERCITY","BRYN, FRESH AIR","THANK U FOR BEING HERE","FAKE FIGHT / WRESTLING","ENTER THE RING"],
["07","NOV 21","MING","NINEORZERO","IN2U","FAKE OLD KOREAN FLYER","입장하기"],
["08","NOV 27","BOLERO","KIRIN","CINNAMON BABY","FAKE ADVERTISING","BUY NOW"]
];
document.querySelector("#blocks").innerHTML=Array.from({length:8},()=>"<i></i>").join("");
document.querySelector("#events").innerHTML=events.map(e=>`<article class="event"><div class="event-top"><span>${e[0]}</span><span>${e[1]}</span></div><div class="photo placeholder"><i>${e[5]}<br>IMAGE SPACE</i></div><span class="tag">SEOUL</span><h2>${e[2]}</h2><p>+ ${e[3]}<br>+ ${e[4]}</p><button class="action" disabled>▣ &nbsp; LOCKED</button></article>`).join("");