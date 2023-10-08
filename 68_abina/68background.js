//Select 7 colors
let colors = [ 'red', 'blue', 'green', 'orange', 'purple', 'black', 'yellow','pink','brown','aqua'];



//change the background of canvas when button is clicked
let button = document.getElementById('button68');

button.addEventListener('click', function(){
    //select a random number between 0 - 6
    let index = parseInt((Math.random()*colors.length)+1);
    //grab the canvas
    let canvas = document.getElementById('canvas68');
    let button = document.getElementById('button68')

    canvas.style.background = `${colors[index]}`
    button.style.background = `${colors[index]}`
     
})