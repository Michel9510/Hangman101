const letterDiv = document.querySelector('.letter-div');
const hintButton = document.querySelector('.hint-btn');
const resetButton = document.querySelector('.reset-btn');
const hintDiv = document.querySelector('.hint-div');
const hintText = document.querySelector('.hint-txt');
const liveSpan = document.querySelector('.lives');
const wordDiv = document.querySelector('.word-div');
const notif = document.querySelector('.notif');
const notifContent = document.querySelector('.notif-content');
const notifSpan = document.querySelector('.notif-span');
const playAgain = document.querySelector('.notif-btn');

let letters;

let lives;

const words = new Map([
  ["ton", "Forwards I am heavy, backwards I am not. What am I?"],
  ["stairs", "What goes up and down but never moves?"],
  ["stamp", "What is able to travel around the globe, but stays in a corner the whole time?"],
  ["short", "What word becomes shorter when you add two letters to it?"],
  ["age", "What goes up and never comes down?"],
  ["megaman", "Evil blue man with a big head that fell in love and become a super hero by accident"],
  ["light", "protagonist of Death Note"],
  ["luffy", "Mugiwara! or Straw Hat Pirates captain"],
  ["swe", "Something you Want Eagerly, hint: CAPS"],
  ["nose", "You wake up everyday and see it but ignored it, what it is?"],
  ["toretto", "I don't have friends. I got family."],
  ["shrek", "Ogres are like onions."],
  ["groot", "I am Groot."],
  ["saw", "I want to play a game."],
  ["leonidas", "This is Sparta!"],
  ["katniss", "I volunteer as tribute."],
  ["einstein", "The true sign of intelligence is not knowledge but imagination."],
  ["einstein", "I know not with what weapons World War III will be fought, but World War IV will be fought with sticks and stones."],
  ["thor", "  God of thunder"],
]);

//list of only keys from words
const word_list = [...words.keys()];

// get random word from word list function
const getRandomWord = function (list) {
  return list[Math.floor(Math.random() * word_list.length)];
};

// random word will be selected everytime it reset or init.
let select_word;

const init = function (state) {
  wordDiv.innerHTML = '';
  if (state === 'start') {
    // adding all the letters to html
    for (const i of 'abcdefghijklmnopqrstuvwxyz') {
      const html = `<button class="alpha">${i.toUpperCase()}</button>`;
      letterDiv.insertAdjacentHTML('beforeend', html);
    }
  } else if (state === 'reset') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      hintDiv.classList.add('hidden');
      notif.classList.add('hidden');
    });
  }
  select_word = getRandomWord(word_list);
  lives = 5;

  // capturing letters div
  letters = document.querySelectorAll('.alpha');
  liveSpan.textContent = lives;

  // putting selected word
  for (let i = 0; i < select_word.length; i++) {
    const html = `<p class="word">_</p>`;
    wordDiv.insertAdjacentHTML('beforeend', html);
  }
};

init('start');

// show notification
const showNotif = function (msg) {
  notif.classList.remove('hidden');
  notifSpan.textContent = select_word;
  notifContent.textContent = `You ${msg}`;
  // lives = 3;
};

// decrease life
const decreaseLife = function () {
  lives--;
  //   console.log(lives);
  liveSpan.textContent = lives;
  if (lives === 0) {
    showNotif('lost');
  }
};

// get multiple matching indexes of pressed letter to the selected word
const getindexes = function (letter) {
  let indexes = [];
  [...select_word].forEach((val, i) => {
    if (val === letter) {
      const index = i;
      indexes.push(index);
    }
  });
  //console.log(indexes);
  return indexes;
};

// check for complete word
const checkWord = function () {
  let val = true;
  for (let i = 0; i < wordDiv.children.length; i++) {
    if (wordDiv.children[i].textContent === '_') {
      val = false;
    }
  }
  return val;
};

// letters event listener
const letterPress = function () {
  const letter = this.textContent.toLowerCase();

  if (select_word.includes(letter)) {
    const indexes_list = getindexes(letter);
    indexes_list.forEach((val, i) => {
      wordDiv.children[val].textContent = this.textContent;
    });
    if (checkWord()) showNotif('won');
  } else {
    decreaseLife();
  }
  this.classList.add('disabled');
};

// listening to letter buttons presses`
letters.forEach(btn => {
  btn.addEventListener('click', letterPress);
});

// Listening to hint btn
hintButton.addEventListener('click', function () {
  hintDiv.classList.remove('hidden');
  hintText.textContent = words.get(select_word);
});

// listening to reset btn
resetButton.addEventListener('click', function () {
  init('reset');
});

// listening to play again button
playAgain.addEventListener('click', function () {
  init('reset');
});