
let keys=document.querySelectorAll('.cs56key');
let blackKeys=document.querySelectorAll('.cs56key.cs56black');
let whiteKeys=document.querySelectorAll('.cs56key.cs56white');


keys.forEach(key =>{
key.addEventListener('click',()=>playMusic(key));
});
/*
document.addEventListener('keydown',e=>{
let key=e.key;
let whiteKeyIndex=WHITE.indexOf(key);
let blackKeyIndex=BLACK.indexOf(key);

if(whiteKeyIndex>-1) playMusic(whiteKeys[whiteKeyIndex]);
if(blackKeyIndex>-1) playMusic(blackKeys[blackKeyIndex])
});*/


function playMusic(key){
    const audio=document.getElementById(key.dataset.note);
    audio.currentTime=0;
    audio.play();
}