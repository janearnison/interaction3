//Set aside computer memory to store the sound
//load sound into memory
// play sound when mouse is clicked in browser 
// stop sound when mouse click ends


let shapeColor;
let sounds = []; 

function preload() {
  sounds.push(loadSound('sounds/water1.mp3')); 
  sounds.push(loadSound('sounds/water2.mp3'));
  sounds.push(loadSound('sounds/water3.mp3'));
  
}


function setup(){
  
 createCanvas(400, 400);
  
  shapeColor = color(245, 10, 90);

  const audioArray = ['sounds/water1.mp3', 'sounds/water2.mp3', 'water3.mp3', 'water4.mp3'];

}


function draw() {
  background(187, 227, 247);
  
	noStroke();
  fill(shapeColor);
  ellipse(width/2, height/2, 200,200);
  
}

function mousePressed(){
  shapeColor = color(random(255), random(255), random(255) );
let randSound = random(sounds);
  randSound.play();
   
 }



