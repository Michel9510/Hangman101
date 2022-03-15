const letterDiv = document.querySelector(".letterA")
const hintButton = document.querySelector(".hint-btn");
const resetButton = document.querySelector(".reset-btn");
const hintD = document.querySelector(".hint-d");
const hintT = document.querySelector(".hint-txt");
const livespan = document.querySelector(".lives");
const wordDiv = document.querySelector(".words");
const notif = document.querySelector(".notif");
const notifContent = document.querySelector(".notif-content");
const notifSpan = document.querySelector(".notif-span");
const Rematch = document.querySelector(".notif-btn");

let letters;

let lives;

const words = new Map([
  ["megaman", "Evil blue man with a big head that fell in love and become a super hero by accident"],
  ["light", "protagonist of Death Note"],
  ["Luffy", "Mugiwara! or Straw Hat Pirates captain"],
  ["SWE", "Something you Want Eagerly, hint: CAPS"],
  ["nose", "You wake up everyday and see it but ignored it, what it is?"],
]);
// list of only keys from words
const word_list = [...words.keys()];
//get random word from a word list function
const getRandomWord = function (list) {
  return list[Math.floor(Math.random() * word_list.length)];
};
// random word will get select everytime it reset
let select_word;

const init = function (state) {
  wordDiv.innerHTML = "";
  if (state === "start") {
    // adding all the letters to html
    for (const i of "abcdefghijklmnopqrstuvwxyz") {
      const html = `<button class="alphabet">${i.toUpperCase()}</button>`;
      letterDiv.insertAdjacentHTML("beforeend", html);
    }
  } else if (state === "reset") {
    letters.forEach(btn => {
      btn.classList.remove("disabled");
    });
    hintD.classList.add("hidden");
    notif.classList.add("hidden");
  }

  lives = 5;
  // capturing letters div
  letters = document.querySelector(".alphabet")
  livespan.textContent = lives;

  select_word = getRandomWord(word_list);
  //putting selected word
  for (let i = 0; i < select_word.length; i++) {
    const html = `<p class="word">_</p>`;
    wordDiv.insertAdjacentHTML("beforeend", html);
  }
};

init("start");