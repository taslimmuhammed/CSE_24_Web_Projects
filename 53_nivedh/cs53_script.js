var cs53_lives=6;
var cs53_choice=0;
var cs53_score=0;
var cs53_wordLen=0;

var cs53_wordcol=["red","fruit","marvel","logic","shark","snake","sword","eras","june","zebra","cat","swift","castle","forest","globe","piano","rocket","candle","guitar","planet","kite"];
var cs53_word="";

document.getElementById("cs53_main").addEventListener("mouseenter", () => {cs53_game_active=true;});
document.getElementById("cs53_main").addEventListener("mouseleave", () => {cs53_game_active=false;});
const cs53_clue = {
    "red": "A color often associated with love and passion.",
    "fruit": "Edible objects that can be sweet or sour.",
    "marvel": "A renowned comic book company.",
    "logic": "The art of reasoning and rational thought, often used to solve complex problems.",
    "shark": "An apex predator of the ocean with multiple rows of sharp teeth.",
    "snake": "A legless animal, some are venomous, and others are constrictors.",
    "sword": "A weapon often wielded by knights and warriors in combat.",
    "eras": "Distinct time periods in history marked by significant events and cultural changes.",
    "june": "The month known for the summer solstice, warm weather, and longer daylight hours.",
    "zebra": "A wild African animal resembling a horse.",
    "cat": "A furry and independent pet known for its agility and sometimes aloof nature.",
    "swift": "Quick and agile in movement, a word often used to describe a bird in flight.",
    "globe": "A three-dimensional representation of the Earth",
    "castle": "A fortified structure, often with turrets and moats, used for protection in medieval times.",
    "forest": "A densely wooded area with a variety of trees, plants, and wildlife.",
    "piano": "A musical instrument with keys that produce sounds when struck by hammers.",
    "rocket": "A vehicle which propels itself by expelling gas at high speeds.",
    "candle": "A source of illumination, often used for decoration and relaxation.",
    "guitar": "A stringed musical instrument that can be plucked or strummed, used in various music genres.",
    "planet": "A celestial body that orbits a star.",
    "kite": "An object flown in the sky, often with a tail, using the wind's force for elevation."
};

var cs53_alphabets ={}
cs53_initializeAlphas();
function cs53_initializeAlphas(){
    cs53_alphabets ={}
    for (let cs53_charCode = 'a'.charCodeAt(0); cs53_charCode <= 'z'.charCodeAt(0); cs53_charCode++) {
        const cs53_letter = String.fromCharCode(cs53_charCode);
        cs53_alphabets[cs53_letter] = 0;
    }
}

document.addEventListener("keydown",function(event){
	if(!cs53_game_active)
		return;
	if (/Key\w/.test(event.code)) {
		var cs53_character = event.key;
		cs53_checkChar(cs53_character);
		cs53_showChosen(cs53_character);
	}
});

function cs53_clearChosenList() {
    var cs53_list = document.getElementById("cs53_chosen");
    while (cs53_list.firstChild) {
        cs53_list.removeChild(cs53_list.firstChild);
    }
}

function cs53_init(){
    cs53_initializeAlphas();
    cs53_word=cs53_wordcol[Math.floor(Math.random()*cs53_wordcol.length)];
    cs53_wordLen=cs53_word.length;
    document.querySelector(".cs53_image").setAttribute("src","./images/cs53_6.png");
    document.querySelector(".cs53_boxes").innerHTML="";
    for(let i=1;i<=cs53_wordLen;i++){
        document.querySelector(".cs53_boxes").innerHTML+="<input type='text' id='cs53_box"+i+"' class='cs53_box' disabled>";
    }
    for(let i=0;i<cs53_wordLen;i++){
         document.getElementById("cs53_box"+(i+1)).value="";
    }
    document.querySelector(".cs53_message").innerHTML="";
    cs53_lives=6;
    document.getElementById("cs53_tries").innerHTML=cs53_lives;
    cs53_clearChosenList();
    cs53_choice=0;
    cs53_correct=false;
    cs53_flag=0;
    document.querySelector(".cs53_clueButton").innerHTML="CLUE <br>-"+Math.floor(cs53_wordLen/2)+" points";
}

cs53_init();

var cs53_correct=false;
var cs53_flag=0;
function cs53_checkChar(cs53_char){
    if(cs53_alphabets[cs53_char]==0){
        cs53_flag=0;
    }else{
        cs53_flag=1;
    }
    for(i=0;i<cs53_wordLen;i++){
        if(cs53_char==cs53_word[i] && cs53_alphabets[cs53_char]==0){
            document.getElementById("cs53_box"+(i+1)).value=cs53_char.toUpperCase();
            cs53_alphabets[cs53_char]=1;
            cs53_choice++;
            cs53_correct=true;
        }

    }
    if(cs53_flag==1){
        document.querySelector(".cs53_message").innerHTML="<h2 style='color: #D36B00;'>CHARACTER ALREADY CHOSEN<h2>";
    }
    else if(cs53_correct){
        document.querySelector(".cs53_message").innerHTML="<h2 style='color: green;'>RIGHT CHOICE<h2>";
    }else{
        cs53_lives--;
        cs53_alphabets[cs53_char]=1;
        document.querySelector(".cs53_message").innerHTML="<h2 style='color: red;'>WRONG CHOICE<h2>";
    }
    cs53_correct=false;
    cs53_flag=0;
    document.getElementById("cs53_tries").innerHTML=cs53_lives;

    switch(cs53_lives){
        case 0:
            document.querySelector(".cs53_image").setAttribute("src","./images/cs53_0.png");
            var cs53_oldScore=cs53_score;
            cs53_score=0;
            document.querySelector('.cs53_score-info').innerHTML = "<h2 style='color: red;'>YOU LOST. SCORE IS "+cs53_oldScore+"</h2>";
            cs53_buttonName('TRY AGAIN');
            break;
        case 1:
            document.querySelector(".cs53_image").setAttribute("src","./images/cs53_1.png");
            break;
        case 2:
            document.querySelector(".cs53_image").setAttribute("src","./images/cs53_2.png");
            break;
        case 3:
            document.querySelector(".cs53_image").setAttribute("src","./images/cs53_3.png");
            break;
        case 4:
            document.querySelector(".cs53_image").setAttribute("src","./images/cs53_4.png");
            break;
        case 5:
            document.querySelector(".cs53_image").setAttribute("src","./images/cs53_5.png");
            break;
        default:
            break;
    }

    if(cs53_choice==cs53_wordLen){
        if(cs53_clueFlag==1){
            cs53_score-=Math.floor(cs53_wordLen/2);
        }
        cs53_score+=cs53_wordLen;
        cs53_clueFlag=0;
        document.querySelector('.cs53_score-info').innerHTML = "<h2 style='color: blue;'>SCORE IS "+cs53_score+"</h2>";
        cs53_buttonName('NEXT WORD');
        
    }
}
function cs53_showChosen(cs53_char){
    document.getElementById("cs53_tries").innerHTML=cs53_lives;
    var cs53_list = document.getElementById("cs53_chosen");
    var cs53_entry = document.createElement('li');
    cs53_entry.classList.add("cs53_li");
    cs53_entry.appendChild(document.createTextNode(cs53_char.toUpperCase()));
    cs53_list.appendChild(cs53_entry);
}

var cs53_clueFlag=0;
function cs53_displayClue(){
    cs53_clueFlag=1;
    document.querySelector(".cs53_clueButton").innerHTML="<h2 style='color: #FFB000;'>"+cs53_clue[cs53_word]+"</h2>";
}
function cs53_buttonName(cs53_buttonText){
    document.querySelector('.cs53_next').innerText = cs53_buttonText;
}
function cs53_nextOrAgain(){
    if(document.querySelector('.cs53_next').innerText=='TRY AGAIN'){
        cs53_score=0;
        document.querySelector('.cs53_score-info').innerHTML = "";
    }
    cs53_init();
}
