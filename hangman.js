var predators = [
	"арслан",
	"чоно",
	"ирвэс",
	"бар",
  "үнэг",
  "бүргэд",
  "илбэнх",
  "могой",
  "шарк",
]

let answer = '';
let maxWrong = 5;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = predators[Math.floor(Math.random() * predators.length)];
}

function generateButtons() {
  let buttonsHTML = 'абвгдеёжзийклмноөрстуүфхцчшщъыьэюя'.split('').map(letter =>
    `
      <button
        class="blackish btn  btn-lg btn-dark m-1"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
    window.alert("Сайн таалаа шүү!");
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.png';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    window.alert("Баяр хүргэе! Амжилттай таалаа!");
    reset();
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'Хариулт нь ' + answer + ' байлаа';
    document.getElementById('keyboard').innerHTML = 'Jigsaw дүүжлэгдлээ';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.png';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
