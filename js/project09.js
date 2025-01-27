// DOM Elements
const arrayContainer = document.getElementById("arrayContainer");
const algorithmSelect = document.getElementById("algorithmSelect");
const speedSlider = document.getElementById("speedSlider");
const speedLabel = document.getElementById("speedLabel");
const sortButton = document.getElementById("sortButton");
const pausePlayButton = document.getElementById("pausePlayButton");
const stepForwardButton = document.getElementById("stepForwardButton");
const stepBackwardButton = document.getElementById("stepBackwardButton");
const resetButton = document.getElementById("resetButton");
const commentary = document.getElementById("commentary");

// Configuration
let array = [];
let animationSpeed = 500; // Default speed
let stopSorting = false; // Flag to stop sorting
let isPaused = false; // Flag to pause sorting
let currentStep = 0; // Current step in the sorting process
let steps = []; // Stores steps for Step Forward and Step Backward

// Utility Functions
function generateArray(size = 20) {
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  steps = [array.slice()]; // Initialize with the starting state
  renderArray();
}

function renderArray(state = array, comparingIndices = []) {
  arrayContainer.innerHTML = "";
  state.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 3}px`;
    bar.textContent = value;
    if (value <= 10) {
      bar.style.fontSize = "12px";
      bar.style.lineHeight = "25px";
    }
    if (comparingIndices.includes(index)) {
      bar.classList.add("comparing"); // Highlight bars being compared
      bar.style.color = "black"; // Set text color to black for highlighted bars
    } else {
      bar.style.color = "#CCCACA"; // Reset text color for non-highlighted bars
    }
    arrayContainer.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Sorting Algorithms
async function bubbleSort() {
  commentary.textContent = "Starting Bubble Sort...";
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (stopSorting) return; // Stop sorting if requested
      while (isPaused) await sleep(50); // Pause the process

      // Highlight bars being compared
      renderArray(array, [j, j + 1]);

      commentary.textContent = `Comparing ${array[j]} and ${array[j + 1]}`;
      await sleep(animationSpeed);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push(array.slice()); // Save step for forward/backward
        renderArray(array, [j, j + 1]);
      }

      // Clear highlights
      renderArray(array);
    }
    renderArray(array); // Clear highlighting
  }
  commentary.textContent = "Bubble Sort Complete!";
  pausePlayButton.disabled = true;
}

// Event Handlers
sortButton.addEventListener("click", async () => {
  stopSorting = false;
  isPaused = false;
  pausePlayButton.disabled = false;
  stepForwardButton.disabled = true;
  stepBackwardButton.disabled = true;
  pausePlayButton.textContent = "Pause";
  await bubbleSort();
});

pausePlayButton.addEventListener("click", () => {
  if (isPaused) {
    isPaused = false;
    pausePlayButton.textContent = "Pause";
  } else {
    isPaused = true;
    pausePlayButton.textContent = "Play";
    stepForwardButton.disabled = false;
    stepBackwardButton.disabled = false;
  }
});

stepForwardButton.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    renderArray(steps[currentStep]);
  }
});

stepBackwardButton.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    renderArray(steps[currentStep]);
  }
});

resetButton.addEventListener("click", () => {
  stopSorting = true;
  isPaused = false;
  pausePlayButton.textContent = "Pause";
  pausePlayButton.disabled = true;
  stepForwardButton.disabled = true;
  stepBackwardButton.disabled = true;
  commentary.textContent = "Sorting process stopped. Array reset.";
  generateArray();
});

speedSlider.addEventListener("input", (e) => {
  const speedValue = parseInt(e.target.value, 10);
  animationSpeed = 1100 - speedValue * 100; // Adjust speed
  if (speedValue <= 3) {
    speedLabel.textContent = "Slow";
  } else if (speedValue <= 7) {
    speedLabel.textContent = "Medium";
  } else {
    speedLabel.textContent = "Fast";
  }
});

// Initialize
generateArray();
