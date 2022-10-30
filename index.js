/**
 * Author: Daniel Duarte <daniel.duarte@gmail.com>
 */

// Parse game parameters from query string
const query = new URL(window.location.href).searchParams;
const params = {
  lang: query.get('lang'),
  mode: query.get('mode'),
};

// Sanitize parameters
const supportedModes = ['random', 'seq'];
const supportedLangs = ['it', 'es'];
if (!supportedModes.includes(params.mode)) { params.mode = supportedModes[0]; }
if (!supportedLangs.includes(params.lang)) { params.lang = supportedLangs[0]; }

const loadLang = (callback) => {
  const langScript = document.createElement('script');
  langScript.onload = callback;
  langScript.src = './lang/' + params.lang + '.js';
  document.head.appendChild(langScript);
};

const toSelect = [];

const init = () => {
  for (let i = 0; i < window.Quattro.nums.length; i++) {
    toSelect.push(i);
  }
};

const generateNum = () => {
  const index = params.mode === 'random' ? Math.floor(Math.random() * toSelect.length) : 0;
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
    display.innerHTML = window.Quattro.nums[n];
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

  loadLang(newChallenge);
};
