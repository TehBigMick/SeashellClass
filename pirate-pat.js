const bookPages = [
  {
    image: 'pirate-pat-1.webp',
    teacherText: 'Pirate Pat found a shiny map.',
    teacherAudio: 'teacher-page-1.m4a',
    cvcWords: ['map', 'pat', 'hat']
  },
  {
    image: 'pirate-pat-2.webp',
    teacherText: 'He sailed on the big ship.',
    teacherAudio: 'teacher-page-2.m4a',
    cvcWords: ['ship', 'bat', 'cat']
  },
  // ... up to page 11
];

let currentPage = 0;

function loadPage(index) {
  const page = bookPages[index];
  document.getElementById('page-image').src = `assets/images/${page.image}`;
  document.getElementById('teacher-text').innerText = page.teacherText;

  // Set up teacher audio
  const teacherAudio = new Audio(`assets/audio/words/${page.teacherAudio}`);
  document.getElementById('play-teacher').onclick = () => teacherAudio.play();

  // Set up CVC words
  const cvcContainer = document.getElementById('cvc-words');
  cvcContainer.innerHTML = '';
  const allAudios = [];
  page.cvcWords.forEach(word => {
    const btn = document.createElement('button');
    btn.innerText = word;
    const wordAudio = new Audio(`assets/audio/words/${word}.m4a`);
    allAudios.push(wordAudio);
    btn.onclick = () => wordAudio.play();
    cvcContainer.appendChild(btn);
  });

  // Play all words
  document.getElementById('play-all-words').onclick = () => {
    allAudios.forEach(audio => audio.play());
  };
}

// Navigation
document.getElementById('prev-page').onclick = () => {
  if (currentPage > 0) {
    currentPage--;
    loadPage(currentPage);
  }
};

document.getElementById('next-page').onclick = () => {
  if (currentPage < bookPages.length - 1) {
    currentPage++;
    loadPage(currentPage);
  }
};

// Initialize first page
loadPage(currentPage);
