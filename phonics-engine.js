(function () {
  const levelSelect = document.getElementById('level-select');
  const gameArea = document.getElementById('game-area');
  const slots = document.getElementById('word-slots');
  const feedback = document.getElementById('feedback');
  const nextButton = document.getElementById('next-button');
  let tokens = [], position = 0, correctWords = 0, lastWord = '';

  function shuffle(items) { return [...items].sort(() => Math.random() - 0.5); }
  function word() { return tokens.join(''); }
  function speakWord() {
    const audio = new Audio(`/assets/audio/words/${word()}.m4a`);
    audio.play().catch(() => {
      if ('speechSynthesis' in window) { speechSynthesis.cancel(); const speech = new SpeechSynthesisUtterance(word()); speech.lang = 'en-GB'; speech.rate = 0.72; speechSynthesis.speak(speech); }
    });
  }
  function playSound(sound) { new Audio(`/assets/audio/phonemes/${sound}.mp3`).play().catch(() => {}); }
  function renderSlots() {
    slots.innerHTML = tokens.map((token, index) => `<span aria-hidden="true">${index < position ? token : '＿'}</span>`).join(' ');
    slots.setAttribute('aria-label', `${position} of ${tokens.length} sounds completed`);
  }
  function nextWord() {
    const set = PHONICS_DATA[levelSelect.value]; let selected;
    do { selected = set.words[Math.floor(Math.random() * set.words.length)]; } while (selected.join('') === lastWord && set.words.length > 1);
    tokens = [...selected]; lastWord = word(); position = 0; feedback.textContent = ''; nextButton.hidden = true; gameArea.innerHTML = ''; renderSlots();
    const distractors = shuffle(set.phonemes.filter((phoneme) => !tokens.includes(phoneme))).slice(0, 4);
    shuffle([...new Set([...tokens, ...distractors])]).forEach((sound) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'phoneme'; button.textContent = sound; button.setAttribute('aria-label', `Sound ${sound}`); button.addEventListener('click', () => choose(sound, button)); gameArea.append(button);
    });
    setTimeout(speakWord, 250);
  }
  function choose(sound, button) {
    if (position >= tokens.length) return;
    if (sound === tokens[position]) {
      playSound(sound); position += 1; button.style.background = '#55a86d'; setTimeout(() => button.removeAttribute('style'), 320); renderSlots(); feedback.textContent = position === tokens.length ? 'You built the word!' : 'Good. Find the next sound.';
      if (position === tokens.length) { correctWords += 1; document.getElementById('score').textContent = `Words: ${correctWords}`; setTimeout(speakWord, 300); Array.from(gameArea.children).forEach((item) => item.disabled = true); nextButton.hidden = false; }
    } else {
      button.style.background = '#f46f62'; feedback.textContent = 'Try a different sound.'; setTimeout(() => button.removeAttribute('style'), 420);
    }
  }
  document.getElementById('listen-button').addEventListener('click', speakWord);
  document.getElementById('reset-button').addEventListener('click', nextWord);
  nextButton.addEventListener('click', nextWord);
  levelSelect.addEventListener('change', () => { correctWords = 0; document.getElementById('score').textContent = 'Words: 0'; lastWord = ''; nextWord(); });
  nextWord();
})();
