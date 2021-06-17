$(document).ready(function () {
  const URL = "http://localhost:8080";

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      let createTweet = createTweetElement(tweet);
      $(".tweets-container").prepend(createTweet);
    }
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
  <div class="text-box"> ${tweet.content.text}</div>
 
  <footer class="footer"><div>${tweet.created_at}</div>
    <div class="small-buttons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </div>
  </footer>
  </article>`;
    return html;
  };

  $("#tweet-text").on("input", function () {
    let characterCount = $(this).val().length;
    if (characterCount > 140) {
      alert("Too many Characters");
    }
  });

  // aJAX respose to post request
  $("#submit-tweet").on("submit", function (event) {
    const tweetText = $("#tweet-text");
    if (tweetText.val().length === 0) {
      alert("Please input message");
      return false;
    }
    event.preventDefault();
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
  });

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
