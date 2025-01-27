// ========== Story Data ==========
const story = {
    start: {
      text: "You wake up in a dark forest. You can hear the sound of rustling leaves and faint howling in the distance. What will you do?",
      illustration: "🌲🌲🌲🌙",
      choices: [
        { text: "Walk toward the sound", next: "howlingPath" },
        { text: "Climb a nearby tree to scout the area", next: "treePath" },
      ],
    },
    howlingPath: {
      text: "You walk toward the sound and see glowing eyes staring back at you. It's a pack of wolves. What will you do?",
      illustration: "🐺🐺🐺✨",
      choices: [
        { text: "Run away", next: "runAway" },
        { text: "Try to scare them off", next: "scareWolves" },
      ],
    },
    treePath: {
      text: "You climb the tree and see a distant cabin with smoke rising from its chimney. What will you do?",
      illustration: "🌳🏠🌳",
      choices: [
        { text: "Climb down and walk toward the cabin", next: "cabinPath" },
        { text: "Stay in the tree and wait until morning", next: "treeWait" },
      ],
    },
    runAway: {
      text: "You manage to escape the wolves and find yourself back where you started. What will you do?",
      illustration: "🏃‍♂️🌲🌲",
      choices: [{ text: "Start again", next: "start" }],
    },
    scareWolves: {
      text: "Your loud shout startles the wolves, and they run off. You see a path ahead leading out of the forest.",
      illustration: "🗣️🐺➡️🌳",
      choices: [{ text: "Follow the path", next: "end" }],
    },
    cabinPath: {
      text: "You arrive at the cabin and meet a kind stranger who offers you food and shelter.",
      illustration: "🏠🍲🛏️",
      choices: [{ text: "Thank the stranger and rest", next: "end" }],
    },
    treeWait: {
      text: "You wait until morning, but you feel weak from hunger. You decide to climb down and move on.",
      illustration: "🌄🌳🍂",
      choices: [{ text: "Climb down", next: "cabinPath" }],
    },
    end: {
      text: "Congratulations! You have survived the forest adventure.",
      illustration: "🎉🌞🌳",
      choices: [{ text: "Play again", next: "start" }],
    },
  };
  
  // ========== Global Variables ==========
  let currentNode = "start";
  let progress = 0;
  
  // DOM Elements
  const storyText = document.getElementById("storyText");
  const choicesContainer = document.getElementById("choicesContainer");
  const progressBarFill = document.getElementById("progressBarFill");
  const illustration = document.getElementById("illustration");
  const resetButton = document.getElementById("resetButton");
  const saveButton = document.getElementById("saveButton");
  const loadButton = document.getElementById("loadButton");
  
  // ========== Functions ==========
  function updateProgress() {
    const totalNodes = Object.keys(story).length;
    progress = (Object.keys(story).indexOf(currentNode) / totalNodes) * 100;
    progressBarFill.style.width = `${progress}%`;
  }
  
  function displayStory(nodeKey) {
    currentNode = nodeKey;
    const node = story[nodeKey];
  
    // Update story text
    storyText.textContent = node.text;
  
    // Update illustration (use emojis)
    illustration.textContent = node.illustration || "✨";
  
    // Clear previous choices
    choicesContainer.innerHTML = "";
  
    // Display choices
    node.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice.text;
      button.addEventListener("click", () => displayStory(choice.next));
      choicesContainer.appendChild(button);
    });
  
    // Update progress bar
    updateProgress();
  }
  
  function resetGame() {
    currentNode = "start";
    displayStory(currentNode);
  }
  
  function saveProgress() {
    localStorage.setItem("storyGameProgress", JSON.stringify({ currentNode }));
    alert("Progress saved!");
  }
  
  function loadProgress() {
    const savedData = localStorage.getItem("storyGameProgress");
    if (savedData) {
      const { currentNode: savedNode } = JSON.parse(savedData);
      displayStory(savedNode);
    } else {
      alert("No saved progress found!");
    }
  }
  
  // ========== Event Listeners ==========
  resetButton.addEventListener("click", resetGame);
  saveButton.addEventListener("click", saveProgress);
  loadButton.addEventListener("click", loadProgress);
  
  // ========== Initialize ==========
  displayStory(currentNode);

  function displayStory(nodeKey) {
    currentNode = nodeKey;
    const node = story[nodeKey];
  
    // Update story text
    storyText.textContent = node.text;
  
    // Update emoji illustration
    illustration.textContent = node.illustration || "✨";
  
    // Clear previous choices
    choicesContainer.innerHTML = "";
  
    // Display choices
    node.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice.text;
      button.addEventListener("click", () => displayStory(choice.next));
      choicesContainer.appendChild(button);
    });
  
    // Update progress bar
    updateProgress();
  }
  
  