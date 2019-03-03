$(document).ready(function() {
  
  let rangeMinimum = 0
  let rangeMaximum = 100
  let gameNumber = Math.floor(Math.random() * (rangeMaximum + 1) + rangeMinimum);
  
  function setGameNumber() {
    rangeMinimum = 0
    rangeMaximum = 100
    gameNumber = Math.floor(Math.random() * (rangeMaximum + 1) + rangeMinimum);
  }
  
  $('.set-range').click(function(event) {
    event.preventDefault();
    rangeMinimum = parseInt($('#minimum').val());
    rangeMaximum = parseInt($('#maximum').val());
    gameNumber = Math.floor(Math.random() * (rangeMaximum + 1) + rangeMinimum);
  })
  
  $('.submit-guess').on('click', function(event) {
    event.preventDefault();
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
    $('.errors').css('display', 'none')
    $('.guess-container').show();
    $('.clear-button').prop('disabled', false)
    $('.number-guess').text(guess);
    if (guess === gameNumber) {
      $('.result').text('BOOM');
    } else if (guess > gameNumber) {
      $('.result').text('That is too high');
    } else {
      $('.result').text('That is too low');
    };
  });
  
  $('.clear-button').on('click', function() {
    $('.guess-field').val('')
    $(this).prop('disabled', true)
  })
  
  $('.reset-button').on('click', function() {
    $('.guess-field').val('');
    $('#minimum').val('');
    $('#maximum').val('');
    $('.guess-container').hide();
    $('.range-container').show();
    setGameNumber();
  });
});