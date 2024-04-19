let soundFiles = [];
let delays = [];
let numSamples = 5; // Number of different samples
let maxConcurrentSounds = 5; // Maximum number of concurrent sounds allowed
let activeSounds = 0; // Number of currently active sounds

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

  // Display colored rectangles for each sample
  for (let i = 0; i < numSamples; i++) {
    fill(random(255), random(255), random(255));
    rect(i * width / numSamples, height, width / numSamples, -50); // Fixed height for simplicity
  }
}

function pointerPressed(event) {
  console.log("Pointer pressed", event);

  // Ensure that audio context is created/resumed after user gesture
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  // Play corresponding sample on tap if not exceeding max concurrent sounds
  if (activeSounds < maxConcurrentSounds) {
    activeSounds++;
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let sampleIndex = Math.floor(map(x, 0, width, 0, numSamples));
    if (sampleIndex >= 0 && sampleIndex < numSamples && !soundFiles[sampleIndex].isPlaying()) {
      let sound = soundFiles[sampleIndex];
      sound.play();
      let delay = new p5.Delay();
      delay.process(sound, 0.2, 0.3, 200);
      delay.setType('pingPong');
      delays.push(delay);

      let filterFreq = map(x, sampleIndex * width / numSamples, (sampleIndex + 1) * width / numSamples, 60, 15000);
      filterFreq = constrain(filterFreq, 60, 15000);
      let filterRes = map(event.clientY, 0, height, 3, 0.01);
      filterRes = constrain(filterRes, 0.01, 3);
      delay.filter(filterFreq, filterRes);
      let delTime = map(event.clientY, 0, width, 0.2, 0.01);
      delTime = constrain(delTime, 0.01, 0.2);
      delay.delayTime(delTime);

      sound.onended(() => {
        // Decrease activeSounds count when sound finishes playing
        activeSounds--;
      });
    }
  }
}
