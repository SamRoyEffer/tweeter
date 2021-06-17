// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];
$(document).ready(function () {
  const renderTweets = function (tweets) {
    console.log("render tweets");
    // loops through tweets
    for (let tweet of tweets) {
      let createTweet = createTweetElement(tweet);
      $(".tweets-container").append(createTweet);
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
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

  renderTweets(data);
});
