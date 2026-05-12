// ====== Data for all pages ======
const bookPages = [
  {
    image: 'pirate-pat-1.webp',
    teacherText: '',
    teacherAudio: '',
    cvcWords: []
  },
  {
    image: 'pirate-pat-2.webp',
    teacherText: "The night was cold,\nthe sky was black,\nthe window rattled...",
    teacherAudio: 'pat-page1.m4a',
    cvcWords: ['tap']
  },
  {
    image: 'pirate-pat-3.webp',
    teacherText: "There's someone there,\nI'm sure of it!\nSam, do stop barking.",
    teacherAudio: 'pat-page2.m4a',
    cvcWords: ['sit', 'sam', 'sit']
  },
  {
    image: 'pirate-pat-4.webp',
    teacherText: "Well, we were scared,\nbut not our Gran.\nShe went to look:",
    teacherAudio: 'pat-page3.m4a',
    cvcWords: ['it', 'is', 'a', 'man']
  },
  {
    image: 'pirate-pat-5.webp',
    teacherText: "A tattered coat,\na huge black hat...\nLook - it's a pirate!",
    teacherAudio: 'pat-page4.m4a',
    cvcWords: ['i', 'am', 'pat']
  },
  {
    image: 'pirate-pat-6.webp',
    teacherText: "Pat hunted in\nhis heavy pack.\nWhat has he found?",
    teacherAudio: 'pat-page5.m4a',
    cvcWords: ['it', 'is', 'a', 'map']
  },
  {
    image: 'pirate-pat-7.webp',
    teacherText: '"But that\'s my home!"\nsays Gran. "Look, lad,\nyou can\'t just dig here."',
    teacherAudio: 'pat-page6.m4a',
    cvcWords: ['pat', 'is', 'sad']
  },
  {
    image: 'pirate-pat-8.webp',
    teacherText: "He starts to frown\nOoh, this looks bad!\nGran says, \"I mean it!\"",
    teacherAudio: 'pat-page7.m4a',
    cvcWords: ['pat', 'is', 'mad']
  },
  {
    image: 'pirate-pat-9.webp',
    teacherText: "But does he listen?\nNot a bit!\nNow look at him-",
    teacherAudio: 'pat-page8.m4a',
    cvcWords: ['pat', 'in', 'a', 'pit']
  },
  {
    image: 'pirate-pat-10.webp',
    teacherText: "A bang, a clang,\nwhat has he hit?\nA treasure chest!\nPat shouts,",
    teacherAudio: 'pat-page9.m4a',
    cvcWords: ['i', 'did', 'it']
  },
  {
    image: 'pirate-pat-11.webp',
    teacherText: "Well done\nPirate Pat!",
    teacherAudio: 'pat-page10.m4a',
    cvcWords: ['pat', 'pat', 'pat']
  }
];

let currentPage = 0;

// ====== Load a page ======
function loadPage(index) {
  const page = bookPages[index];

  // Teacher section
  const imgEl = document.getElementById('page-image');
  const teacherTextEl = document.getElementById('teacher-text');
  const playTeacherBtn = document.getElementById('play-teacher');

  imgEl.src = `assets/images/${page.image}`;
  teacherTextEl.innerText = page.teacherText;

  // Teacher audio
  const teacherAudio = page.teacherAudio ? new Audio(`assets/audio/words/${page.teacherAudio}`) : null;
  playTeacherBtn.onclick = () => {
    if (teacherAudio) teacherAudio.play();
  };

  // Student section: CVC words
  const cvcContainer = document.getElementById('cvc-words');
  cvcContainer.innerHTML = '';
  const allAudios = [];

  page.cvcWords.forEach(word => {
    const btn = document.createElement('button');
    btn.innerText = word;
    btn.classList.add('cvc-button');

    const wordAudio = new Audio(`assets/audio/words/${word}.m4a`);
    allAudios.push(wordAudio);

    // On click, play full word
    btn.onclick = () => wordAudio.play();

    // Optional: play letters individually on click
    btn.ondblclick = () => {
      word.split('').forEach(letter => {
        const letterAudio = new Audio(`assets/audio/phonemes/${letter}.mp3`);
        letterAudio.play();
      });
    };

    cvcContainer.appendChild(btn);
  });

  // Play all words button
  const playAllBtn = document.getElementById('play-all-words');
  playAllBtn.onclick = () => {
    let delay = 0;
    allAudios.forEach(audio => {
      setTimeout(() => audio.play(), delay);
      delay += 600; // 0.6s between each word
    });
  };
}

// ====== Navigation ======
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

// ====== Initialise first page ======
loadPage(currentPage);
