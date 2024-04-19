//Set aside computer memory to store the sound
//load sound into memory
// play sound when mouse is clicked in browser 
// stop sound when mouse click ends


let shapeColor;
let analyzer; 
let sounds = [];  

function preload() {
  sounds.push(loadSound('sounds/water10.mp3')); 
  sounds.push(loadSound('sounds/water11.mp3'));
  sounds.push(loadSound('sounds/water12.mp3'));
  sounds.push(loadSound('sounds/water13.mp3'));

}


function setup(){
  
  canvas = createCanvas(windowWidth, windowHeight); 
    noCursor(); 
  
  shapeColor = color(245, 150, 90);

  const audioArray = ['sounds/water10.mp3', 'sounds/water11.mp3', 'sounds/water12.mp3', 'sounds/water13.mp3'];

}


function draw() {
  background(0, 0, 0);
  
	noStroke();
  fill(shapeColor);
  ellipse(width/2, height/2, windowWidth,windowHeight);
  
}

function mousePressed(){
  shapeColor = color(random(255), random(255), random(255) );
let randSound = random(sounds);
  randSound.play();
   
 }



