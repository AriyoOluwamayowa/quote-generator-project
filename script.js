const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('Author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQoutes = [];

//  sow loading 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//  hide loadig 
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//  show new quote 
function newQuotes() {
    loading();
     // pick a ranndom quote from apiQuotes array 

     const quote = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];
    // check if author field is blank and replace it with "unknown"
if (!quote.author) {
    authorText.textContent = 'unknown';
} else {
    authorText.textContent = quote.author;
}
//  check quote length to determine styling 
if (quote.text.lenngth > 100) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote');
}
// set quote jide loader
    quoteText.textContent = quote.text;
    complete();
}
// Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const reponse = await fetch(apiUrl);
        apiQoutes = await reponse.json();
       newQuotes();
    } catch (error) {
        // catch error here
    }
}


//  tweet quote 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listener 
newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);
// on load 
getQuotes();
// newQuotes();
