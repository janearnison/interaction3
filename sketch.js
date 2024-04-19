//Set aside computer memory to store the sound
//load sound into memory
// play sound when mouse is clicked in browser 
// stop sound when mouse click ends


let shapeColor;
let sounds = []; 
let reverb; 

function preload() {
  sounds.push(loadSound('sounds/water6.mp3')); 
  sounds.push(loadSound('sounds/water7.mp3'));
  sounds.push(loadSound('sounds/water8.mp3'));
  sounds.push(loadSound('sounds/water9.mp3'));
  
  
}


function setup(){
  
  canvas = createCanvas(windowWidth, windowHeight); 
    noCursor(); 
  
  shapeColor = color(245, 150, 90);

  const audioArray = ['sounds/water6.mp3', 'sounds/water7.mp3', 'sounds/water8.mp3', 'sounds/water9.mp3'];

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



