/**
 *  @name Delay
 *  @arialabel When the user touches the black screen, music plays, and a lime green rectangle appears from the bottom at a height level correlating with the amplitude of the sound as it plays
 *  @description
 *  Touch the screen to hear the p5.Delay process a SoundFile.
 *  TouchX controls the p5.Delay Filter Frequency.
 *  TouchY controls both the p5.Delay Time and Resonance.
 *  Visualize the resulting sound's volume with an Amplitude object.
 *
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * a sound file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */

let soundFile, analyzer, delay;

function preload() {
  soundFormats('ogg', 'mp3');
  soundFile = loadSound('sounds/water10.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  soundFile.disconnect(); // so we'll only hear delay

  delay = new p5.Delay();
  delay.process(soundFile, 0.12, 0.7, 2300);
  delay.setType('pingPong'); // a stereo effect

  analyzer = new p5.Amplitude();
}

function draw() {
  background(0);

  // get volume reading from the p5.Amplitude analyzer
  let level = analyzer.getLevel();

  // use level to draw a green rectangle
  let levelHeight = map(level, 0, 0.1, 0, height);
  fill(100, 0, 100);
  rect(0, height, width, -levelHeight);

  if (touches.length > 0) {
    let filterFreq = map(touches[0].x, 0, width, 60, 15000);
    filterFreq = constrain(filterFreq, 60, 15000);
    let filterRes = map(touches[0].y, 0, height, 3, 0.01);
    filterRes = constrain(filterRes, 0.01, 3);
    delay.filter(filterFreq, filterRes);
    let delTime = map(touches[0].y, 0, width, 0.2, 0.01);
    delTime = constrain(delTime, 0.01, 0.2);
    delay.delayTime(delTime);
  }
}

function touchStarted() {
  soundFile.play();
}
