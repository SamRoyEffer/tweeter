$(document).ready(function () {
  //when it detects a key input reduce the number of characters
  $("#tweet-text").on("input", function () {
    let characterCount = $(this).val().length;
    let tweetCharacterAmount = 140 - characterCount;

    if (tweetCharacterAmount < 0) {
      $(".counter").css("color", "#ff0000");
    }
    if (tweetCharacterAmount > 0) {
      $(".counter").css("color", "#000");
    }

    $(".counter").val(tweetCharacterAmount);
  });
});
