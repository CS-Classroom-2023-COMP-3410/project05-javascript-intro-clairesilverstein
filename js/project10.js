// -----------------------------
// Configuration and Utilities
// -----------------------------
const wordList = [
    "house", "quick", "jump", "stream", "mountain", "garden", "silent", "whisper", "blue", "forest",
    "paper", "light", "energy", "world", "dream", "hope", "trust", "strong", "peace", "clever",
    "music", "shadow", "path", "river", "cloud", "storm", "glow", "happy", "bright", "gentle",
    "focus", "kind", "truth", "dance", "laugh", "bold", "space", "time", "victory",
    "goal", "silver", "golden", "train", "travel", "machine", "keyboard", "screen", "design", "code",
    "build", "fix", "explore", "learn", "create", "connect", "think", "start", "finish", "win"
  ];
  
  const possibleCharacters = {
    special: "!@#$%^&*()-_=+[]{};:'\",.<>?/\\|`~",
  };
  
  /**
   * Generate random text string as unique words based on user-selected options.
   * @param {string} difficulty
   * @param {boolean} includeSpecial
   * @returns {string} Randomly generated text (words)
   */
  function generateText(difficulty, includeSpecial) {
    let wordCount;
    switch (difficulty) {
      case "easy":
        wordCount = 5;
        break;
      case "medium":
        wordCount = 10;
        break;
      case "hard":
        wordCount = 15;
        break;
    }
  
    const shuffledWords = [...wordList].sort(() => Math.random() - 0.5);
    let generatedWords = shuffledWords.slice(0, wordCount);
  
    if (includeSpecial) {
      generatedWords = generatedWords.map((word) => {
        const randomSpecialChar = possibleCharacters.special[Math.floor(Math.random() * possibleCharacters.special.length)];
        return word + randomSpecialChar;
      });
    }
  
    return generatedWords.join(" ");
  }
  
  // -----------------------------
  // DOM Elements
  // -----------------------------
  const difficultySelect = document.getElementById("difficulty");
  const specialCharsCheckbox = document.getElementById("special-chars");
  const startBtn = document.getElementById("start-btn");
  const textToTypeDiv = document.getElementById("text-to-type");
  const userInput = document.getElementById("user-input");
  const resultsDiv = document.getElementById("results");
  const wpmDisplay = document.getElementById("wpm");
  const accuracyDisplay = document.getElementById("accuracy");
  const restartBtn = document.getElementById("restart-btn");
  const virtualKeyboard = document.getElementById("virtual-keyboard");
  
  let generatedText = "";
  let startTime = null;
  let timerRunning = false;
  
  // -----------------------------
  // Virtual Keyboard Setup
  // -----------------------------
  const allKeys = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:'\",.<>?/\\|`~ ".split("");
  
  function createKeyboard() {
    virtualKeyboard.innerHTML = "";
    allKeys.forEach((key) => {
      const keyDiv = document.createElement("div");
      keyDiv.classList.add("key");
      keyDiv.textContent = key === " " ? "Space" : key;
      keyDiv.dataset.key = key;
      virtualKeyboard.appendChild(keyDiv);
    });
  }
  
  // -----------------------------
  // Event Handlers
  // -----------------------------
  startBtn.addEventListener("click", () => {
    const difficulty = difficultySelect.value;
    const includeSpecial = specialCharsCheckbox.checked;
  
    generatedText = generateText(difficulty, includeSpecial);
    displayGeneratedText(generatedText);
  
    userInput.value = "";
    userInput.disabled = false;
    userInput.focus();
    resultsDiv.style.display = "none";
    startTime = null;
    timerRunning = false;
  });
  
  restartBtn.addEventListener("click", () => {
    userInput.value = "";
    userInput.disabled = false;
    resultsDiv.style.display = "none";
    startTime = null;
    timerRunning = false;
  
    for (let i = 0; i < generatedText.length; i++) {
      const span = document.getElementById(`char-${i}`);
      if (span) span.classList.remove("char-correct", "char-incorrect");
    }
  
    userInput.focus();
  });
  
  userInput.addEventListener("input", () => {
    if (!timerRunning && userInput.value.length > 0) {
      startTime = new Date();
      timerRunning = true;
    }
  
    const currentValue = userInput.value;
    for (let i = 0; i < generatedText.length; i++) {
      const span = document.getElementById(`char-${i}`);
      if (span) {
        if (i < currentValue.length) {
          span.classList.toggle("char-correct", currentValue[i] === generatedText[i]);
          span.classList.toggle("char-incorrect", currentValue[i] !== generatedText[i]);
        } else {
          span.classList.remove("char-correct", "char-incorrect");
        }
      }
    }
  
    highlightKey(currentValue.slice(-1));
  
    if (currentValue.length === generatedText.length) {
      userInput.disabled = true;
      calculateResults();
    }
  });
  
  function highlightKey(char) {
    document.querySelectorAll(".key").forEach((key) => {
      key.classList.toggle("active", key.dataset.key === char);
    });
  }
  
  function displayGeneratedText(text) {
    let html = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      html += `<span id="char-${i}">${char}</span>`;
    }
    textToTypeDiv.innerHTML = html;
  }
  
  function calculateResults() {
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    const timeInMinutes = timeTaken / 60;
  
    let correctChars = 0;
    for (let i = 0; i < generatedText.length; i++) {
      if (userInput.value[i] === generatedText[i]) {
        correctChars++;
      }
    }
  
    const totalChars = generatedText.length;
    const wpm = Math.round((totalChars / 5) / timeInMinutes);
    const accuracy = ((correctChars / totalChars) * 100).toFixed(2);
  
    wpmDisplay.textContent = `Words Per Minute (WPM): ${wpm}`;
    accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
    resultsDiv.style.display = "block";
  }
  
  // -----------------------------
  // Initialize
  // -----------------------------
  createKeyboard();
  