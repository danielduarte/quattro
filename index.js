const nums = [
  'zero',
  'uno',
  'due',
  'tre',
  'quattro',
  'cinque',
  'sei',
  'sette',
  'otto',
  'nove',
  'dieci',
  'undici',
  'dodici',
  'tredici',
  'quattordici',
  'quindici',
  'sedici',
  'diciassette',
  'diciotto',
  'diciannove',
  'venti',
  'ventuno',
  'ventidue',
  'ventitré',
  'ventiquattro',
  'venticinque',
  'ventisei',
  'ventisette',
  'ventotto',
  'ventinove',
  'trenta',
  'trentuno',
  'trentadue',
  'trentatré',
  'trentaquattro',
  'trentacinque',
  'trentasei',
  'trentasette',
  'trentotto',
  'trentanove',
  'quaranta',
  'quarantuno',
  'quarantadue',
  'quarantatré',
  'quarantaquattro',
  'quarantacinque',
  'quarantasei',
  'quarantasette',
  'quarantotto',
  'quarantanove',
  'cinquanta',
  'cinquantuno',
  'cinquantadue',
  'cinquantatré',
  'cinquantaquattro',
  'cinquantacinque',
  'cinquantasei',
  'cinquantasette',
  'cinquantotto',
  'cinquantanove',
  'sessanta',
  'sessantuno',
  'sessantadue',
  'sessantatré',
  'sessantaquattro',
  'sessantacinque',
  'sessantasei',
  'sessantasette',
  'sessantotto',
  'sessantanove',
  'settanta',
  'settantuno',
  'settantadue',
  'settantatré',
  'settantaquattro',
  'settantacinque',
  'settantasei',
  'settantasette',
  'settantotto',
  'settantanove',
  'ottanta',
  'ottantuno',
  'ottantadue',
  'ottantatré',
  'ottantaquattro',
  'ottantacinque',
  'ottantasei',
  'ottantasette',
  'ottantotto',
  'ottantanove',
  'novanta',
  'novantuno',
  'novantadue',
  'novantatré',
  'novantaquattro',
  'novantacinque',
  'novantasei',
  'novantasette',
  'novantotto',
  'novantanove',
  'cento',
];

// Select mode according to query string params
let mode = new URL(window.location.href).searchParams.get('mode');
if (!['random', 'seq'].includes(mode)) { mode = 'random'; }

const toSelect = [];

const init = () => {
  for (let i = 0; i < nums.length; i++) {
    toSelect.push(i);
  }
};

const generateNum = () => {
  const index = mode === 'random' ? Math.floor(Math.random() * toSelect.length) : 0;
  const num = toSelect[index];
  toSelect.splice(index, 1);
  return num;
};


window.onload = () => {
  const display = document.getElementById('display');

  let showingSolution;
  let n;

  const newChallenge = () => {
    if (toSelect.length === 0) {
      init();
    }
    n = generateNum();
    showingSolution = false;

    display.innerHTML = n;
    display.classList.remove('solution');
  };  
  
  const showSolution = () => {
    showingSolution = true;

    display.classList.add('solution');
    display.innerHTML = nums[n];
  };

  const handleUpdate = () => {
    if (showingSolution) {
      newChallenge();
    } else {
      showSolution();
    }
  };

  document.addEventListener('keydown', handleUpdate);
  document.addEventListener('click', handleUpdate);

  newChallenge();
};
