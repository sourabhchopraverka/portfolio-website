const choices = ["rock", "paper", "scissors"];
const userScoreSpan = document.getElementById("userScore");
const cpuScoreSpan = document.getElementById("cpuScore");
const resultDiv = document.getElementById("result");
const playAgainBtn = document.getElementById("playAgain");

let userScore = 0;
let cpuScore = 0;

document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    const userChoice = button.dataset.choice;
    playGame(userChoice);
  });
});

playAgainBtn.addEventListener("click", () => {
  resultDiv.textContent = "Make your move!";
  playAgainBtn.style.display = "none";
});

function playGame(userChoice) {
  const cpuChoice = choices[Math.floor(Math.random() * 3)];
  const winner = getWinner(userChoice, cpuChoice);

  let message = `You chose ${emoji(userChoice)}, CPU chose ${emoji(cpuChoice)}. `;

  if (winner === "user") {
    userScore++;
    message += "🎉 You Win!";
  } else if (winner === "cpu") {
    cpuScore++;
    message += "💥 You Lose!";
  } else {
    message += "🤝 It's a Draw!";
  }

  userScoreSpan.textContent = userScore;
  cpuScoreSpan.textContent = cpuScore;
  resultDiv.textContent = message;
  playAgainBtn.style.display = "inline-block";
}

function getWinner(user, cpu) {
  if (user === cpu) return "draw";
  if (
    (user === "rock" && cpu === "scissors") ||
    (user === "scissors" && cpu === "paper") ||
    (user === "paper" && cpu === "rock")
  ) {
    return "user";
  }
  return "cpu";
}

function emoji(choice) {
  return {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
  }[choice];
}

