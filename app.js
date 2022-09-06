// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;



// Listen for guess
guessBtn.addEventListener('click', () =>{
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    gameOver(true, "You won!");
  }else{
    guessesLeft -= 1;
    if(guessesLeft === 0){
      gameOver(false, `Tough luck asshole, the correct number was ${winningNum}`);
    }else{
      // Game continues, answer wrong
      setMessage(`${guess} was not the right guess, ${guessesLeft} guesses left`, "red");
      // Clear input
      guessInput.value = '';
    }
  }
})

function setMessage(errorMessage, color){
  message.style.color = color;
  message.textContent = errorMessage;
}

function gameOver(won, msg){
  let color;
  // Change border color according to result
  won === true? color = "green" : color = "red";
  // Disable input
  guessInput.disabled = true;
  // Input Color
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);
  // New game?
  guessBtn.value = "Play again?";
  guessBtn.className = "play-again";
}

// Play again Eventlistener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Get winning number
function getRandomNumber(min, max){
  return (Math.floor(Math.random()*(max-min+1)+min));
}