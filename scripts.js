// sets global variable for gameNumber aka the answer. Initializes it to use default 0-10 range. Being a global variable means it can be updated by any other function, which is what we want. 
var gameNumber = Math.floor(Math.random() * 11);
// sets global variable for rangeMinimum, along with default of 0, which can be updated from any place in the script.
var rangeMinimum = 0;
// sets global variable and default of 10 for rangeMaximum, which can be updted from any place in the script.
var rangeMaximum = 10;

// Adds event listener for the document being ready aka full page loaded before any of the event listeners begin listening and DOM can be manipulated.
$(document).ready(function() {
  // sets the text of the range-display class 
  $('.range-display').text(`Current Range: ${rangeMinimum} to ${rangeMaximum}`);
  
  // event listener for when the set-range button (identified using the .set-range class) is clicked on. Calls anonymous function.
  $('.set-range').click(function(event) {
    // since the class is a button the default is to trigger a post action. This prevents that and instead does what is specified below.
    event.preventDefault();
    // calls the setRange function.
    setRange();
  });
  
  // Event listener for the submit guess button (identified using the .submit-guess class). Calls anonymous function.
  $('.submit-guess').click(function(event) {
    // Prevents default button action.
    event.preventDefault();
<<<<<<< Updated upstream
    makeGuess();
=======
    // calls makeGuess function with current values of rangeMinimum, rangeMaximum, and gameNumber
    makeGuess(rangeMinimum, rangeMaximum, gameNumber);
>>>>>>> Stashed changes
  });
  
  $('.clear-button').on('click', function() {
    $('.guess-field').val('');
    $(this).prop('disabled', true);
  });
  
  $('.reset-button').on('click', function() {
    resetGame();
  });
  
  $('.next-round-button').on('click', function(event) {
    event.preventDefault();
    getNextRound();
  })
});

function makeGuess() {
  $('.range-container').hide();
  var guess = parseInt($('.guess-field').val());
  try {
    if (isNaN(guess)) throw "a number";
    if (guess < rangeMinimum) throw rangeMinimum + " or higher";
    if (guess > rangeMaximum) throw rangeMaximum + " or lower";
  }
  catch(err) {
    $('.errors').show().text('Input must be ' + err);
    return
  }
  $('.errors').hide();
  $('.guess-container').show();
  $('.clear-button').prop('disabled', false);
  $('.number-guess').text(guess);
  if (guess === gameNumber) {
    $('.result').text("BOOM! You won! Next Round!");
    $('.guess-field').prop('disabled', true);
    $('.next-round-button').show();
  } else if (guess > gameNumber) {
    $('.result').text('That is too high');
  } else {
    $('.result').text('That is too low');
  };
};

function setGameNumber() {
  gameNumber = Math.floor((Math.random() * (rangeMaximum - rangeMinimum + 1)) + rangeMinimum);
};

function setRange() {
  rangeMinimum = parseInt($('#minimum').val());
  rangeMaximum = parseInt($('#maximum').val());
  setGameNumber();
  $('.range-display').text(`Current Range: ${rangeMinimum} to ${rangeMaximum}`)
};

function resetGame() {
  $('.guess-field').val('');
  $('.guess-field').prop('disabled', false);
  $('#minimum').val('');
  $('#maximum').val('');
  rangeMinimum = 0;
  rangeMaximum = 10;
  $('.range-display').text(`Current Range: ${rangeMinimum} to ${rangeMaximum}`);
  $('.guess-container').hide();
  $('.range-container').show();
  setGameNumber();
};

function getNextRound() {
  $('.guess-container').hide();
  $('.next-round-button').hide();
  $('.guess-field').prop('disabled', false);
  $('.guess-field').val('');
  rangeMinimum -= 10;
  rangeMaximum += 10;
  $('.range-display').text(`Current Range: ${rangeMinimum} to ${rangeMaximum}`);
  setGameNumber();
};