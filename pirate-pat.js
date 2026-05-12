function loadPage(index) {
  const page = bookPages[index];

  // ===== Teacher Section =====
  const imgEl = document.getElementById('page-image');
  const teacherTextEl = document.getElementById('teacher-text');
  const playTeacherBtn = document.getElementById('play-teacher');

  imgEl.src = `assets/images/${page.image}`;
  teacherTextEl.innerText = page.teacherText;

  const teacherAudio = page.teacherAudio ? new Audio(`assets/audio/words/${page.teacherAudio}`) : null;
  playTeacherBtn.onclick = () => {
    if (teacherAudio) teacherAudio.play();
  };

  // ===== Student Section =====
  const cvcContainer = document.getElementById('cvc-words');
  cvcContainer.innerHTML = '';

  page.cvcWords.forEach(word => {
    // Container for each word
    const wordDiv = document.createElement('div');
    wordDiv.classList.add('word-container');
    wordDiv.style.marginBottom = '15px';

    // Letter buttons
    word.split('').forEach(letter => {
      const letterBtn = document.createElement('button');
      letterBtn.innerText = letter;
      letterBtn.classList.add('letter-button');
      letterBtn.onclick = () => {
        const letterAudio = new Audio(`assets/audio/phonemes/${letter}.mp3`);
        letterAudio.play();
      };
      wordDiv.appendChild(letterBtn);
    });

    // Full word button
    const wordAudio = new Audio(`assets/audio/words/${word}.m4a`);
    const playWordBtn = document.createElement('button');
    playWordBtn.innerText = '🔊 Play Word';
    playWordBtn.onclick = () => wordAudio.play();
    playWordBtn.style.marginLeft = '10px';
    playWordBtn.classList.add('play-word-button');

    wordDiv.appendChild(playWordBtn);
    cvcContainer.appendChild(wordDiv);
  });
}
