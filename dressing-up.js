// ===== Data for all pages =====
const dressingPages = [
  { image: 'dressing-up1.webp', teacherText: '', teacherAudio: '', cvcWords: [] }, // Title
  { image: 'dressing-up2.webp', teacherText: "I'd like to be a mermaid.", teacherAudio: 'dressing1.m4a', cvcWords: ['i','can','sit','on','a','rock'] },
  { image: 'dressing-up3.webp', teacherText: "Or maybe a circus acrobat -", teacherAudio: 'dressing2.m4a', cvcWords: ['i','can','get','up','on','top'] },
  { image: 'dressing-up4.webp', teacherText: "Or how about a grizzly bear?", teacherAudio: 'dressing3.m4a', cvcWords: ['i','can','dig','a','den'] },
  { image: 'dressing-up5.webp', teacherText: "I'd like to sail the seven seas.", teacherAudio: 'dressing4.m4a', cvcWords: ['i','can','mop','a','deck'] },
  { image: 'dressing-up6.webp', teacherText: "Or watch me score the winning goal -", teacherAudio: 'dressing5.m4a', cvcWords: ['i','can','kick','at','a','net'] },
  { image: 'dressing-up7.webp', teacherText: "I could be an explorer.", teacherAudio: 'dressing6.m4a', cvcWords: ['i','can','pack','a','map'] },
  { image: 'dressing-up8.webp', teacherText: "Or maybe a sleeping princess.\nHush now!", teacherAudio: 'dressing7.m4a', cvcWords: ['i','can','nap'] },
  { image: 'dressing-up9.webp', teacherText: "Perhaps I'll be a superstar chef?", teacherAudio: 'dressing8.m4a', cvcWords: ['i','can','pick','up','a','pan'] },
  { image: 'dressing-up10.webp', teacherText: "I can be anything I like,", teacherAudio: 'dressing9.m4a', cvcWords: ['i','can','i','can','i','can'] }
];

// ===== Start on title page =====
let currentDressingPage = 0;

// ===== Load a page =====
function loadDressingPage(index) {
  const page = dressingPages[index];

  // ===== Teacher Section =====
  const imgEl = document.getElementById('page-image');
  const teacherTextEl = document.getElementById('teacher-text');
  const playTeacherBtn = document.getElementById('play-teacher');
  document.getElementById('page-indicator').textContent = `Page ${index + 1} of ${dressingPages.length}`;
  document.getElementById('prev-page').disabled = index === 0;
  document.getElementById('next-page').disabled = index === dressingPages.length - 1;

  imgEl.src = `/assets/images/${page.image}`;
  teacherTextEl.innerText = page.teacherText;

  const teacherAudio = page.teacherAudio ? new Audio(`/assets/audio/words/${page.teacherAudio}`) : null;
  playTeacherBtn.onclick = () => {
    if (teacherAudio) teacherAudio.play().catch(() => speak(page.teacherText));
  };

  // Hide Play button if no audio (title page)
  playTeacherBtn.style.display = teacherAudio ? 'inline-block' : 'none';

  // ===== Student Section =====
  const cvcContainer = document.getElementById('cvc-words');
  cvcContainer.innerHTML = '';

  if (page.cvcWords.length > 0) {
    page.cvcWords.forEach(word => {
      const wordDiv = document.createElement('div');
      wordDiv.classList.add('word-container');
      wordDiv.style.marginBottom = '15px';

      // Letter buttons
      word.split('').forEach(letter => {
        const letterBtn = document.createElement('button');
        letterBtn.innerText = letter;
        letterBtn.classList.add('letter-button');
        letterBtn.onclick = () => {
          const letterAudio = new Audio(`/assets/audio/phonemes/${letter}.mp3`);
          letterAudio.play();
        };
        wordDiv.appendChild(letterBtn);
      });

      // Full word button
      const wordAudio = new Audio(`/assets/audio/words/${word}.m4a`);
      const playWordBtn = document.createElement('button');
      playWordBtn.innerText = '🔊 Play Word';
      playWordBtn.onclick = () => wordAudio.play().catch(() => speak(word));
      playWordBtn.style.marginLeft = '10px';
      playWordBtn.classList.add('play-word-button');

      wordDiv.appendChild(playWordBtn);
      cvcContainer.appendChild(wordDiv);
    });
  }
}

// ===== Navigation =====
document.getElementById('prev-page').onclick = () => {
  if (currentDressingPage > 0) {
    currentDressingPage--;
    loadDressingPage(currentDressingPage);
  }
};

document.getElementById('next-page').onclick = () => {
  if (currentDressingPage < dressingPages.length - 1) {
    currentDressingPage++;
    loadDressingPage(currentDressingPage);
  }
};

// ===== Initialize after DOM loads =====
document.addEventListener('DOMContentLoaded', () => {
  loadDressingPage(currentDressingPage);
});

function speak(text) {
  if (!text || !('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'en-GB';
  speech.rate = 0.76;
  speechSynthesis.speak(speech);
}
