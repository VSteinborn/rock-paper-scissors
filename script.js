"use strict";

function showRock() {
  document.querySelector(".opponent-image").src = "./imgs/rock.png";
}

function showPaper() {
  document.querySelector(".opponent-image").src = "./imgs/paper.png";
}

function showScissors() {
  document.querySelector(".opponent-image").src = "./imgs/scissors.png";
}

function showUnknown() {
  document.querySelector(".opponent-image").src = "./imgs/question.png";
}

function showComputerSymbol(computerSymbol) {
  switch (computerSymbol) {
    case "rock":
      showRock();
      break;
    case "paper":
      showPaper();
      break;
    case "scissors":
      showScissors();
      break;
  }
}

function getScoreReward(userSymbolIdx, computerSymbolIdx) {
  if (userSymbolIdx == computerSymbolIdx) {
    // draw
    document.querySelector("body").style.backgroundColor = "orange";
    document.querySelector(".message").textContent = "Draw!";
    return 0;
  } else if ((userSymbolIdx + 1) % 3 == computerSymbolIdx) {
    // lose
    document.querySelector("body").style.backgroundColor = "red";
    document.querySelector(".message").textContent = "Lose!";
    return 0;
  } else {
    // win
    document.querySelector("body").style.backgroundColor = "green";
    document.querySelector(".message").textContent = "Win!";
    return 1;
  }
}

function getNextComputerIndex(lastComputerIndex) {
  // Choose actions according to the following paper: Assumes Player will mimic computer's last move
  // https://royalsocietypublishing.org/doi/epdf/10.1098/rspb.2011.1024
  // https://blogs.cornell.edu/info2040/2019/09/24/everyday-game-theory-analyzing-rock-paper-scissors/
  lastComputerIndex++;
  return lastComputerIndex % 3;
}

function endGame() {
  document.querySelector("body").style.backgroundColor = "#222";
  const highscore = Number(document.querySelector(".highscore").textContent);
  if (highscore < score) {
    document.querySelector(".highscore").textContent = score;
    document.querySelector(".message").textContent = "New Highscore!";
  } else {
    document.querySelector(".message").textContent = "New game!";
  }
  document.querySelector(".score").textContent = 0;
  showUnknown();
  playedGames = 0;
  score = 0;
}

function symbolClick(userSymbolIdx) {
  showComputerSymbol(symbols[computerSymbolIdx]);
  score += getScoreReward(userSymbolIdx, computerSymbolIdx);
  document.querySelector(".score").textContent = score;
  playedGames++;
  if (5 <= playedGames) {
    endGame();
  }
  computerSymbolIdx = getNextComputerIndex(computerSymbolIdx);
}

let computerSymbolIdx = Math.floor(Math.random() * 3);
const symbols = ["rock", "paper", "scissors"];
let computerSymbol = symbols[computerSymbolIdx];
let playedGames = 0;
let score = Number(document.querySelector(".score").textContent);

document.querySelector(".rock").addEventListener("click", function () {
  const userSymbolIdx = 0;
  symbolClick(userSymbolIdx);
});

document.querySelector(".paper").addEventListener("click", function () {
  const userSymbolIdx = 1;
  symbolClick(userSymbolIdx);
});

document.querySelector(".scissors").addEventListener("click", function () {
  const userSymbolIdx = 2;
  symbolClick(userSymbolIdx);
});

document.querySelector(".reset").addEventListener("click", function () {
  endGame();
});
