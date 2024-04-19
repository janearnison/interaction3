//Set aside computer memory to store the sound
//load sound into memory
// play sound when mouse is clicked in browser 
// stop sound when mouse click ends


let shapeColor;
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

  analyzer = new p5.Amplitude();

}


function draw() {
  background(0, 0, 0);
  
	noStroke();
  fill(shapeColor);
  ellipse(width/2, height/2, windowWidth,windowHeight);

    // get volume reading from the p5.Amplitude analyzer
    let level = analyzer.getLevel();

    // use level to draw a green rectangle
    let levelHeight = map(level, 0, 0.1, 0, height);
    fill(100, 250, 100);
    rect(0, height, width, -levelHeight);
  
    let filterFreq = map(mouseX, 0, width, 60, 15000);
    filterFreq = constrain(filterFreq, 60, 15000);
    let filterRes = map(mouseY, 0, height, 3, 0.01);
    filterRes = constrain(filterRes, 0.01, 3);
  
}

function mousePressed(){
  shapeColor = color(random(255), random(255), random(255) );
let randSound = random(sounds);
  randSound.play();
   
 }



