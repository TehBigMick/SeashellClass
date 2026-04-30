let currentLevel = PHONICS_DATA.level1;
let currentWord = "";
let index = 0;
let mode = "tap";

function playSound(letter) {
  new Audio("assets/audio/phonemes/" + letter + ".mp3").play();
}

function playWord(word) {
  new Audio("assets/audio/words/" + word + ".mp3").play();
}

/* ===== MODE SWITCH ===== */
function setMode(newMode) {
  mode = newMode;
  document.getElementById("mode-title").innerText =
    mode === "tap" ? "Tap the Sounds" : "Build the Word";

  nextRound();
}

/* ===== NEXT ROUND ===== */
function nextRound() {
  currentWord = currentLevel.words[Math.floor(Math.random() * currentLevel.words.length)];
  index = 0;

  document.getElementById("target-word").innerText = "Word: " + currentWord;
  document.getElementById("feedback").innerText = "";

  renderGame();
}

/* ===== RENDER ===== */
function renderGame() {
  let area = document.getElementById("game-area");
  area.innerHTML = "";

  if (mode === "tap") {
    renderTapMode(area);
  } else {
    renderBuildMode(area);
  }
}

/* ===== TAP MODE ===== */
function renderTapMode(area) {
  let shuffled = currentWord.split('').sort(() => Math.random() - 0.5);

  shuffled.forEach(letter => {
    let el = createLetter(letter);
    el.onclick = () => checkTap(letter, el);
    area.appendChild(el);
  });
}

function checkTap(letter, el) {
  if (letter === currentWord[index]) {
    playSound(letter);
    el.style.background = "#81c784";
    index++;

    if (index === currentWord.length) {
      success();
    }
  } else {
    fail(el);
  }
}

/* ===== BUILD MODE ===== */
function renderBuildMode(area) {
  let letters = currentLevel.phonemes;
  let shuffled = [...letters].sort(() => Math.random() - 0.5);

  shuffled.forEach(letter => {
    let el = createLetter(letter);
    el.onclick = () => checkBuild(letter, el);
    area.appendChild(el);
  });
}

function checkBuild(letter, el) {
  if (letter === currentWord[index]) {
    playSound(letter);
    el.style.background = "#4fc3f7";
    index++;

    if (index === currentWord.length) {
      success();
    }
  } else {
    fail(el);
  }
}

/* ===== UI HELPERS ===== */
function createLetter(letter) {
  let el = document.createElement("span");
  el.className = "phoneme";
  el.innerText = letter;
  return el;
}

function success() {
  document.getElementById("feedback").innerText = "⭐ Great!";
  playWord(currentWord);
}

function fail(el) {
  el.style.background = "#ef5350";
  document.getElementById("feedback").innerText = "Try again!";
}

/* ===== INIT ===== */
nextRound();
