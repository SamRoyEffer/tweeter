$(document).ready(function () {
  const URL = "http://localhost:8080";

  const renderTweets = function (tweets) {
    $(".tweets-container").empty();
    for (let tweet of tweets) {
      let createTweet = createTweetElement(tweet);
      $(".tweets-container").prepend(createTweet);
    }
  };

  const escape = function (str) {
    //diverting possibly malicious text
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    const html = `<article class="text-area">
    <div class="top-tweet-box">
    <div class="avatar-username">
    <img class= "avatar-image" src=${tweet.user.avatars}></img>
    <p class="username">${tweet.user.name}</p>
    </div>
    <div class="handle">${tweet.user.handle}</div>
  </div>
  <div class="text-box">${escape(tweet.content.text)}</div>
 
  <footer class="footer"><div>${timeago.format(tweet.created_at)}</div>
    <div class="small-buttons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </div>
  </footer>
  </article>`;
    return html;
  };

  // aJAX respose to post request
  $("#submit-tweet").on("submit", function (event) {
    event.preventDefault();
    const tweetText = $("#tweet-text");
    const tweetVal = tweetText.val().length;
    const isToLong = tweetVal > 140;
    const isToShort = tweetVal === 0;

    if (isToLong || isToShort) {
      //providing errors if conditions are met
      const message = isToLong ? "Too Many Characters" : "Please Input Tweet";
      $(".error-message").text(message);
      $("#error-container").slideDown("fast", function () {});
      return false;
    } else {
      $("#error-container").slideUp("fast", function () {});

      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize(),
      })

        .then((response) => {
          loadTweets();
          tweetText.val("");
          console.log("THIS IS RESPONSE", response);
        })
        .catch((err) => {
          console.log(`err loading tweet: ${err}`);
        });
    }
  });

  // AJAX get request for newley created tweet
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "JSON",
    })
      .then((tweets) => {
        //tweets coming from server
        console.log("THIS IS LOADTWEET", tweets);
        renderTweets(tweets);
      })

      .catch((err) => {
        console.log(`err loading tweet: ${err}`);
      });
  };

  loadTweets();
});
