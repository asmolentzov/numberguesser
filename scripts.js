$(document).ready(function() {
  
  var rangeMinimum = 0
  var rangeMaximum = 10
  var gameNumber = Math.floor(Math.random() * (rangeMaximum + 1) + rangeMinimum);
  $('.range-display').text(`Current Range: ${rangeMinimum} to ${rangeMaximum}`)
  
  $('.set-range').click(function(event) {
    event.preventDefault();
    rangeMinimum = parseInt($('#minimum').val());
    rangeMaximum = parseInt($('#maximum').val());
    gameNumber = Math.floor(Math.random() * (rangeMaximum + 1) + rangeMinimum);
  });
  
  $('.submit-guess').click(function(event) {
    event.preventDefault();
    makeGuess(rangeMinimum, rangeMaximum, gameNumber);
  });
  
  $('.clear-button').on('click', function() {
    $('.guess-field').val('');
    $(this).prop('disabled', true);
  });
  
  $('.reset-button').on('click', function() {
    $('.guess-field').val('');
    $('#minimum').val('');
    $('#maximum').val('');
    $('.guess-container').hide();
    $('.range-container').show();
    setGameNumber();
  });
  
  $('.next-round-button').on('click', function(event) {
    event.preventDefault();
    $('.guess-container').hide();
    $('.next-round-button').hide();
    $('.guess-field').val('');
    rangeMinimum -= 10;
    rangeMaximum += 10;
    $('.range-display').text(`Current Range: ${rangeMinimum} to ${rangeMaximum}`)
  })
});

function makeGuess(min, max, correct) {
  $('.range-container').hide();
  var guess = parseInt($('.guess-field').val());
  try {
    if (isNaN(guess)) throw "a number";
    if (guess < min) throw min + " or higher";
    if (guess > max) throw max + " or lower";
  }
  catch(err) {
    $('.errors').show().text('Input must be ' + err);
    return
  }
  $('.errors').hide();
  $('.guess-container').show();
  $('.clear-button').prop('disabled', false)
  $('.number-guess').text(guess);
  if (guess === correct) {
    $('.result').text("BOOM! You won! Next Round!");
    $('.next-round-button').show();
  } else if (guess > correct) {
    $('.result').text('That is too high');
  } else {
    $('.result').text('That is too low');
  };
};

function setGameNumber() {
  rangeMinimum = 0
  rangeMaximum = 100
  gameNumber = Math.floor(Math.random() * (rangeMaximum + 1) + rangeMinimum);
};