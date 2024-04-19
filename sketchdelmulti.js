/**
 *  @name Delay with Multitouch
 *  @arialabel When the user touches the black screen, music plays, and a lime green rectangle appears from the bottom at a height level correlating with the amplitude of the sound as it plays
 *  @description
 *  Touch the screen to hear the p5.Delay process a SoundFile.
 *  TouchX controls the p5.Delay Filter Frequency.
 *  TouchY controls both the p5.Delay Time and Resonance.
 *  Visualize the resulting sound's volume with an Amplitude object.
 *  Multitouch to trigger different samples.
 *
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * sound files, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */

let soundFiles = [];
let analyzers = [];
let delays = [];
let numSamples = 4; // Number of different samples

function preload() {
  for (let i = 1; i <= numSamples; i++) {
    let sound = loadSound('sounds/water' + i + '.mp3');
    soundFiles.push(sound);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numSamples; i++) {
    let sound = soundFiles[i];
    sound.disconnect(); // so we'll only hear delay

    let delay = new p5.Delay();
    delay.process(sound, 0.12, 0.7, 2300);
    delay.setType('pingPong'); // a stereo effect
    delays.push(delay);

    let analyzer = new p5.Amplitude();
    analyzers.push(analyzer);
  }
}

function draw() {
  background(0);

  // Display green rectangles for each sample
  for (let i = 0; i < numSamples; i++) {
    let analyzer = analyzers[i];
    let level = analyzer.getLevel();
    let levelHeight = map(level, 0, 0.1, 0, height);
    fill(100, 0, 100);
    rect(i * width / numSamples, height, width / numSamples, -levelHeight);
  }

  // Update delay effects based on touches
  for (let i = 0; i < touches.length && i < numSamples; i++) {
    let x = touches[i].x;
    let y = touches[i].y;

    let sampleIndex = Math.floor(map(x, 0, width, 0, numSamples));
    let delay = delays[sampleIndex];

    let filterFreq = map(x, sampleIndex * width / numSamples, (sampleIndex + 1) * width / numSamples, 60, 15000);
    filterFreq = constrain(filterFreq, 60, 15000);
    let filterRes = map(y, 0, height, 3, 0.01);
    filterRes = constrain(filterRes, 0.01, 3);
    delay.filter(filterFreq, filterRes);
    let delTime = map(y, 0, width, 0.2, 0.01);
    delTime = constrain(delTime, 0.01, 0.2);
    delay.delayTime(delTime);
  }
}

function touchStarted() {
  // Play corresponding sample on touch
  for (let i = 0; i < touches.length && i < numSamples; i++) {
    let x = touches[i].x;
    let sampleIndex = Math.floor(map(x, 0, width, 0, numSamples));
    soundFiles[sampleIndex].play();
  }
}
