let soundFiles = [];
let delays = [];
let numSamples = 5; // Number of different samples
let maxConcurrentSounds = 5; // Maximum number of concurrent sounds allowed
let activeTouches = {}; // Object to track active touches by pointerId


// Assuming you have some event listener for pointer press
// Example:
// pointer.addEventListener('press', onPointerPressed);


function preload() {
  for (let i = 1; i <= numSamples; i++) {
    let sound = loadSound('sounds/water' + i + '.mp3');
    soundFiles.push(sound);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Add event listeners for pointer events
  canvas.addEventListener('pointerdown', pointerPressed);
  canvas.addEventListener('pointerup', pointerReleased);
  canvas.addEventListener('pointercancel', pointerCanceled);
}

function draw() {
    background(0);
    fill('magenta');
  
    // Draw an ellipse at the current pointer position
    ellipse(coordX, coordY, 50, 50);
  }
  
  // This prevents default touch interaction
  function mousePressed() {
    return false;
  }
  
  document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
  });
  
  var coordX = 0;
  var coordY = 0;
  
  // Use pointermove event to handle both mouse and touch events
  window.onmousemove = coordHandler;
  window.onpointerdown = coordHandler;
  window.onpointermove = coordHandler;
  
  function coordHandler(event) {
    // Update coordinates based on event type
    switch (event.type) {
      case 'mousemove':
      case 'pointerdown':
      case 'pointermove':
        coordX = event.clientX;
        coordY = event.clientY;
        break;
    }
  }

function pointerPressed(event) {
  console.log("Pointer pressed", event);

  // Ensure that audio context is created/resumed after user gesture
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  // If max concurrent sounds are already playing, ignore the new touch
  if (Object.keys(activeTouches).length >= maxConcurrentSounds) {
    return;
  }

  let x = event.clientX - canvas.getBoundingClientRect().left;
  let sampleIndex = Math.floor(map(x, 0, width, 0, numSamples));
  if (sampleIndex >= 0 && sampleIndex < numSamples && !soundFiles[sampleIndex].isPlaying()) {
    activeTouches[event.pointerId] = true;
    playSound(sampleIndex, event.clientY);
  }
}

function pointerReleased(event) {
  console.log("Pointer released", event);
  
  // Remove the touch from activeTouches when pointer up event occurs
  delete activeTouches[event.pointerId];
}

function pointerCanceled(event) {
  console.log("Pointer canceled", event);
  
  // Remove the touch from activeTouches when pointer cancel event occurs
  delete activeTouches[event.pointerId];
}

function playSound(sampleIndex, pageY) {
    let sound = soundFiles[sampleIndex];
    sound.play();
    let delay = new p5.Delay();
    delay.process(sound, 0.2, 0.45, 500);
    delay.setType('pingPong');
    delays.push(delay);
  
    let filterFreq = map(pageY, 0, height, 60, 15000);
    filterFreq = constrain(filterFreq, 60, 15000);
    let filterRes = map(pageY, 0, height, 3, 0.01);
    filterRes = constrain(filterRes, 0.01, 3);
    delay.filter(filterFreq, filterRes);
    let delTime = map(pageY, 0, height, 0.2, 0.01);
    delTime = constrain(delTime, 0.01, 0.2);
    delay.delayTime(delTime);

  sound.connect(delay);

  sound.onended(() => {
    // Remove the touch from activeTouches when sound finishes playing
    delete activeTouches[event.pointerId];
  });

  }
  

  

  

