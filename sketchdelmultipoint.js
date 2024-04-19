let soundFiles = [];
let analyzers = [];
let delays = [];
let numSamples = 5; // Number of different samples

function preload() {
  for (let i = 1; i <= numSamples; i++) {
    let sound = loadSound('sounds/water' + i + '.mp3');
    soundFiles.push(sound);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Add event listener for pointer press
  canvas.addEventListener('pointerdown', pointerPressed);
}

function draw() {
  background(0);

  // Display green rectangles for each sample
  for (let i = 0; i < numSamples; i++) {
    let analyzer = analyzers[i];
    let level = analyzer ? analyzer.getLevel() : 0;
    let levelHeight = map(level, 0, 0.1, 0, height);
    fill(100, 0, 100);
    rect(i * width / numSamples, height, width / numSamples, -levelHeight);
  }
}

function pointerPressed(event) {
  console.log("Pointer pressed", event);

  // Ensure that audio context is created/resumed after user gesture
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  // Play corresponding sample on tap
  for (let i = 0; i < numSamples; i++) {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let sampleIndex = Math.floor(map(x, 0, width, 0, numSamples));
    if (sampleIndex === i) {
      if (!soundFiles[i].isPlaying()) {
        soundFiles[i].play();
        let delay = new p5.Delay();
        delay.process(soundFiles[i], 0.12, 0.7, 2300);
        delay.setType('pingPong');
        delays.push(delay);

        let analyzer = new p5.Amplitude();
        analyzers.push(analyzer);
        soundFiles[i].connect(analyzer);
        soundFiles[i].connect(delay);
      }
    }
  }
}
