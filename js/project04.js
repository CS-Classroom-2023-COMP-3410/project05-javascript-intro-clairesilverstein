// ========== Quiz Data ==========
const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: 2,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 1,
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      correct: 2,
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
      correct: 1,
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "O2", "CO2", "HO"],
      correct: 0,
    },
  ];
  
  // ========== Global Variables ==========
  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = [];
  
  // DOM Elements
  const questionText = document.getElementById("questionText");
  const optionsList = document.getElementById("optionsList");
  const feedback = document.getElementById("feedback");
  const nextButton = document.getElementById("nextButton");
  const restartButton = document.getElementById("restartButton");
  const results = document.getElementById("results");
  
  // ========== Load Question ==========
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    optionsList.innerHTML = "";
  
    currentQuestion.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <label>
          <input type="radio" name="option" value="${index}">
          ${option}
        </label>
      `;
      optionsList.appendChild(li);
    });
  
    feedback.textContent = "";
    nextButton.disabled = true; // Disable next button until an answer is selected
  }
  
  // ========== Check Answer ==========
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
      feedback.textContent = "Please select an answer.";
      return false;
    }
  
    const answer = parseInt(selectedOption.value, 10);
    userAnswers[currentQuestionIndex] = answer;
  
    if (answer === questions[currentQuestionIndex].correct) {
      feedback.textContent = "Correct!";
      feedback.style.color = "green";
    } else {
      feedback.textContent = `Wrong! The correct answer is "${questions[currentQuestionIndex].options[questions[currentQuestionIndex].correct]}".`;
      feedback.style.color = "red";
    }
  
    nextButton.disabled = false; // Enable the next button after answering
    return true;
  }
  
  // ========== Move to the Next Question ==========
  function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
  
    // Ensure user has selected an answer
    if (!selectedOption) {
      feedback.textContent = "Please select an answer before proceeding.";
      return;
    }
  
    const answer = parseInt(selectedOption.value, 10);
  
    // Check if the answer is correct and update score
    if (answer === questions[currentQuestionIndex].correct) {
      score++;
    }
  
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      showResults();
    }
  }
  
  // ========== Show Results ==========
  function showResults() {
    questionText.style.display = "none";
    optionsList.style.display = "none";
    feedback.style.display = "none";
    nextButton.style.display = "none";
    restartButton.style.display = "block";
  
    results.style.display = "block";
    results.innerHTML = `
      <h2>Quiz Completed</h2>
      <p>Your Score: ${score}/${questions.length}</p>
      <h3>Review Answers:</h3>
      <ul>
        ${questions
          .map(
            (q, index) =>
              `<li>
                <strong>${index + 1}. ${q.question}</strong><br>
                Your Answer: ${
                  userAnswers[index] !== undefined
                    ? q.options[userAnswers[index]]
                    : "No answer"
                }<br>
                Correct Answer: ${q.options[q.correct]}
              </li>`
          )
          .join("")}
      </ul>
    `;
  }
  
  // ========== Restart Quiz ==========
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
  
    questionText.style.display = "block";
    optionsList.style.display = "block";
    feedback.style.display = "block";
    nextButton.style.display = "block";
    restartButton.style.display = "none";
  
    results.style.display = "none";
  
    loadQuestion();
  }
  
  // ========== Event Listeners ==========
  optionsList.addEventListener("change", checkAnswer);
  nextButton.addEventListener("click", nextQuestion);
  restartButton.addEventListener("click", restartQuiz);
  
  // ========== Initialize Quiz ==========
  loadQuestion();
  