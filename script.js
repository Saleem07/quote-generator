const quoteText = document.getElementById("quote");
const quoteContainer = document.getElementById("quote-container");
const authorText = document.getElementById("author");
const nextBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");
//* Show loading

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//* hide loading

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// * Get quotes from API
async function getQuote() {
  showLoadingSpinner();
  const url = "http://api.quotable.io/random";
  const response = await fetch(url);
  const data = await response.json();
  if (data.author === "") {
    authorText.innerText = "Unknown";
  } else {
    authorText.innerText = data.author;
  }

  if (data.content.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerText = data.content;

  removeLoadingSpinner();
}
//* Tweet the quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//* Events
nextBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();
