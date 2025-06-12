// declare a variable to store the quotes data from the API
let quotesData;

// create an array of background colors to be used for each quote
var colors = [
  "#410979",
  "#020024",
  "#0560b3",
  "#05b3a8",
  "#b59a1f",
  "#85b51f",
  "#26b51f",
  "#1fb57e",
  "#1f9cb5",
  "#1f53b5",
  "#581fb5",
  "#8d1fb5"
];

// declare variables to store the current quote and author
var currentQuote = "";
var currentAuthor = "";

// a function to set headers, parse and get ALL quotes from the API
function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json"
    },
    url:
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === "string") {
        quotesData = JSON.parse(jsonQuotes);
      }
    }
  });
}

// a function to get a random quote from the quotes data
function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

// a function to get and display a new random quote
function getQuote() {
  // get a random quote
  let randomQuote = getRandomQuote();

  // store the current quote and author
  let currentQuote = randomQuote.quote;
  let currentAuthor = randomQuote.author;

  // update the tweet button href with the current quote and author
  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  // update the tumblr button href with the current quote and author
  $("#tumblr-quote").attr(
    "href",
    "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
      encodeURIComponent(currentAuthor) +
      "&content=" +
      encodeURIComponent(currentQuote) +
      "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
  );

  // fade out the current quote text and fade in the new quote text
  $(".quote-text").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#text").text(randomQuote.quote);
  });

  // fade out the current author text and fade in the new author text
  $(".quote-author").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#author").html(randomQuote.author);
  });

  // change the background color and button color to a random color
  var color = Math.floor(Math.random() * colors.length);
  $("html body").animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $(".button").animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}

// when the document is ready, get all the quotes data from the API
$(document).ready(function () {
  getQuotes().then(() => {
    // display a random quote on the page
    getQuote();
  });

  // add event listener for the new quote button
  $("#new-quote").on("click", getQuote);
});
