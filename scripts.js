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
    // Calls makeGuess function.
    makeGuess();
  });
  
  // Event listener for clicking on the Clear button. Calls anonymous function. 
  $('.clear-button').on('click', function() {
    // Clears the guess field - replaces any contents with an empty string.
    $('.guess-field').val('');
    // Disables the clear button (since it was just used).
    $(this).prop('disabled', true);
  });
  
  // Event listener for clicking on the Reset button. Calls anonymous function.
  $('.reset-button').on('click', function() {
    // Calls the resetGame function.
    resetGame();
  });
  
  // Event listener for clicking on the Next Round button. Calls anonymous function.
  $('.next-round-button').on('click', function(event) {
    // Prevents the default button action.
    event.preventDefault();
    // Calls the getNextRound function.
    getNextRound();
  })
});

// Declares the makeGuess function.
function makeGuess() {
  // Hides the range-container class.
  $('.range-container').hide();
  // sets the variable guess to equal the value of the guess-field, parsed as an integer. Could probably use let here, but mostly stuck to using var. 
  var guess = parseInt($('.guess-field').val());
  // Starts error catching. Tries possible errors.
  try {
    // if guess is not a number, throw the specified error.
    if (isNaN(guess)) throw "a number";
    // if guess is less than the allowed minimum, throw the specified error.
    if (guess < rangeMinimum) throw rangeMinimum + " or higher";
    // if guess is greater than the allowed maximum, throw the specified error.
    if (guess > rangeMaximum) throw rangeMaximum + " or lower";
  }
  // If errors are thrown from above, run the code in the following block.
  catch(err) {
    // Show the errors class, and make the text as specified. 
    $('.errors').show().text('Input must be ' + err);
    // Return here means exit out of this method. This means the guess does not go through, since there was an error.
    return
  }
  // Hide the errors class (if it was showing). 
  $('.errors').hide();
  // Show the guess-container class (if it was hidden).
  $('.guess-container').show();
  // Disable the Clear button.
  $('.clear-button').prop('disabled', false);
  // Update the number-guess class to contain the guess (that's the big pink number). 
  $('.number-guess').text(guess);
  // if the guess is correct, execute the following code
  if (guess === gameNumber) {
    // update the result class with the following text
    $('.result').text("BOOM! You won! Next Round!");
    // disable the guess field so the user can't enter more guesses
    $('.guess-field').prop('disabled', true);
    // show the Next Round button since the user can progress to the next round!
    $('.next-round-button').show();
    // Else if the guess is higher than the answer, execute the following code
  } else if (guess > gameNumber) {
    // update the result class text as follows
    $('.result').text('That is too high');
    // Else (catch-all, or in this case, if the guess is lower than the answer)
  } else {
    // update the result class text as follows
    $('.result').text('That is too low');
  };
};

// Declares the setGameNumber function
function setGameNumber() {
  // Updates the gameNumber global variable to a new random number between the rangeMinimum and rangeMaximum. 
  gameNumber = Math.floor((Math.random() * (rangeMaximum - rangeMinimum + 1)) + rangeMinimum);
  // Does not return anything, just updates the variable.
};

// Declares the setRange function.
function setRange() {
  // updates the rangeMinimum global variable to be whatever the value of the minimum field is. 
  rangeMinimum = parseInt($('#minimum').val());
  // updates the rangeMaximum global variable to be whatever the value of the maximum field is.
  rangeMaximum = parseInt($('#maximum').val());
  // calls the setGameNumber function to update the gameNumber variable
  setGameNumber();
  // updates the range-display class to display the new range
  $('.range-display').text(`Current Range: ${rangeMinimum} to ${rangeMaximum}`)
};

// Declares the resetGame function.
function resetGame() {
  // Clears the guess field (replaces contents with an empty string).
  $('.guess-field').val('');
  // Un-disables the guess field (in case it was previously disabled, e.g. if a user had won a round).
  $('.guess-field').prop('disabled', false);
  // Clears the minimum field
  $('#minimum').val('');
  // Clears the maximum field
  $('#maximum').val('');
  // Re-sets rangeMinimum to the default of 0
  rangeMinimum = 0;
  // Re-sets rangeMaximum to the default of 10
  rangeMaximum = 10;
  // Updates range-display to show the updated range
  $('.range-display').text(`Current Range: ${rangeMinimum} to ${rangeMaximum}`);
  // Hides the guess container (since effectively starting new game)
  $('.guess-container').hide();
  // Shows the range container
  $('.range-container').show();
  // Calls the setGameNumber function to get a new gameNumber.
  setGameNumber();
};

// Declares the getNextRound function
function getNextRound() {
  // Hides the guess container
  $('.guess-container').hide();
  // Hides the Next Round button
  $('.next-round-button').hide();
  // Enables the guess field
  $('.guess-field').prop('disabled', false);
  // Clears the guess field
  $('.guess-field').val('');
  // Decreases the rangeMinimum by 10
  rangeMinimum -= 10;
  // Increases the rangeMaximum by 10
  rangeMaximum += 10;
  // Updates the range-display to show current range
  $('.range-display').text(`Current Range: ${rangeMinimum} to ${rangeMaximum}`);
  // Calls setGameNumber to set a new gameNumber
  setGameNumber();
};