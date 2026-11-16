let entries = [];
let selectedIndex = 0;
const $ = (id) => document.getElementById(id);
const alphabet = $('alphabet');
const gallery = $('letterGallery');
const search = $('searchInput');

async function init() {
  try {
    const response = await fetch('data/vocabulary.json');
    if (!response.ok) throw new Error('Could not load vocabulary data.');
    entries = await response.json();
    renderAlphabet();
    renderGallery();
    selectWord(0);
    search.addEventListener('input', renderGallery);
    $('prevWord').addEventListener('click', () => selectWord((selectedIndex + 25) % 26));
    $('nextWord').addEventListener('click', () => selectWord((selectedIndex + 1) % 26));
    $('randomWord').addEventListener('click', () => selectWord(Math.floor(Math.random() * entries.length)));
    $('menuToggle').addEventListener('click', () => {
      const nav = document.querySelector('.main-nav');
      nav.classList.toggle('open');
      $('menuToggle').setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  } catch (error) {
    $('wordFeature').innerHTML = `<p class="no-results">${error.message} Please run this project from a local web server or GitHub Pages.</p>`;
  }
}
function renderAlphabet() {
  alphabet.innerHTML = entries.map((entry, index) => `<button class="letter-button" data-index="${index}" aria-label="${entry.letter}: ${entry.word}">${entry.letter}</button>`).join('');
  alphabet.querySelectorAll('button').forEach(button => button.addEventListener('click', () => selectWord(Number(button.dataset.index))));
}
function renderGallery() {
  const term = search.value.trim().toLowerCase();
  const filtered = entries.map((entry,index)=>({entry,index})).filter(({entry}) => [entry.word,entry.play,entry.definition,entry.letter].join(' ').toLowerCase().includes(term));
  $('collectionCount').textContent = `${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'}`;
  gallery.innerHTML = filtered.length ? filtered.map(({entry,index}) => `<button class="gallery-card ${index===selectedIndex?'active':''}" data-index="${index}" aria-label="Open ${entry.word}"><img src="${entry.image}" alt="" loading="lazy"><span><b>${entry.letter}</b><small>${entry.word}</small></span></button>`).join('') : '<p class="no-results">No words found. Try another search.</p>';
  gallery.querySelectorAll('button').forEach(button => button.addEventListener('click', () => selectWord(Number(button.dataset.index))));
}
function selectWord(index) {
  selectedIndex = (index + entries.length) % entries.length;
  const entry = entries[selectedIndex];
  $('wordLetter').textContent = entry.letter;
  $('wordTitle').textContent = entry.word;
  $('wordPos').textContent = entry.partOfSpeech;
  $('wordDefinition').textContent = entry.definition;
  $('wordQuote').textContent = entry.quote;
  $('quotePlay').textContent = entry.play;
  $('quoteScene').textContent = entry.scene;
  $('quoteSpeaker').textContent = entry.speaker;
  $('quoteNote').textContent = entry.note;
  $('wordImage').src = entry.image;
  $('wordImage').alt = `Impressionist-inspired artwork for ${entry.word}`;
  setAudioSource('wordAudio', entry.wordAudio);
  setAudioSource('quoteAudio', entry.quoteAudio);
  alphabet.querySelectorAll('button').forEach((button,i)=>button.classList.toggle('selected',i===selectedIndex));
  renderGallery();
}
function setAudioSource(id, src) {
  const player = $(id);
  player.pause();
  player.src = src;
  player.load();
}
init();
