// ========== Global Variables ==========
const gameContainer = document.getElementById("gameContainer");
const movesCountElement = document.getElementById("movesCount");
const timeElapsedElement = document.getElementById("timeElapsed");
const restartButton = document.getElementById("restartButton");

let cards = [];
let firstCard = null;
let secondCard = null;
let moves = 0;
let timeElapsed = 0;
let timer = null;
let matchedPairs = 0;

// ========== Generate Cards ==========
function generateCards() {
  const icons = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🥝", "🍍"];
  const cardValues = [...icons, ...icons]; // Duplicate for pairs
  cardValues.sort(() => Math.random() - 0.5); // Shuffle

  gameContainer.innerHTML = ""; // Clear the grid
  cards = [];

  cardValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card", "hidden");
    card.dataset.value = value;
    card.textContent = value;

    card.addEventListener("click", handleCardClick);
    gameContainer.appendChild(card);
    cards.push(card);
  });
}

// ========== Handle Card Click ==========
function handleCardClick(e) {
  const card = e.target;

  if (card.classList.contains("flipped") || card.classList.contains("matched")) {
    return;
  }

  // Flip the card
  card.classList.remove("hidden");
  card.classList.add("flipped");

  if (!firstCard) {
    // First card clicked
    firstCard = card;
  } else if (!secondCard) {
    // Second card clicked
    secondCard = card;

    // Increment move count
    moves++;
    movesCountElement.textContent = moves;

    // Check for match
    if (firstCard.dataset.value === secondCard.dataset.value) {
      // It's a match
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");

      firstCard = null;
      secondCard = null;

      matchedPairs++;
      if (matchedPairs === cards.length / 2) {
        clearInterval(timer);
        setTimeout(() => alert(`You won! Time: ${timeElapsed}s, Moves: ${moves}`), 100);
      }
    } else {
      // Not a match, flip back after a short delay
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        firstCard.classList.add("hidden");
        secondCard.classList.remove("flipped");
        secondCard.classList.add("hidden");

        firstCard = null;
        secondCard = null;
      }, 1000);
    }
  }
}

// ========== Start Timer ==========
function startTimer() {
  timeElapsed = 0;
  timer = setInterval(() => {
    timeElapsed++;
    timeElapsedElement.textContent = timeElapsed;
  }, 1000);
}

// ========== Restart Game ==========
function restartGame() {
  moves = 0;
  movesCountElement.textContent = moves;

  matchedPairs = 0;
  clearInterval(timer);
  timeElapsedElement.textContent = 0;

  firstCard = null;
  secondCard = null;

  generateCards();
  startTimer();
}

// ========== Event Listeners ==========
restartButton.addEventListener("click", restartGame);

// ========== Initialize Game ==========
generateCards();
startTimer();
