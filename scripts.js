$(document).ready(function() {
  var gameNumber = Math.floor(Math.random() * 100 + 1)
  $('.submit-guess').on('click', function(event) {
    event.preventDefault();
    var guess = parseInt($('.guess-field').val());
    console.log(guess)
    try {
      if (isNaN(guess)) throw "a number";
      if (guess <= 0) throw "1 or higher";
      if (guess > 100) throw "100 or lower";
    }
    catch(err) {
      $('.errors').css('display', 'block').text('Input must be ' + err);
      return
    }
    $('.errors').css('display', 'none')
    $('.guess-container').css('display', 'block')
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
    $('.guess-container').css('display', 'none');
  });
});