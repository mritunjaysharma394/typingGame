//all quotes
//to add more...
const quotes = [
	'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
	'There is nothing more deceptive than an obvious fact.',
	'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
	'I never make exceptions. An exception disproves the rule.',
	'What one man can invent another can discover.',
	'Nothing clears up a case so much as stating it to another person.',
	'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

//list of words and the index of the word user will type.
let words = [];
let wordIndex = 0;

let startTime = Date.now();

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', () => {

	document.getElementById('typed-value').disabled = false;
	//random quote index
	const quoteIndex = Math.floor(Math.random() * quotes.length);
	const quote = quotes[quoteIndex];

	words = quote.split(' ');
	//reset wordIndex for tracking
	wordIndex = 0;

	const spanWords = words.map(function (word) {
		return `<span>${word} </span>`
	});

	quoteElement.innerHTML = spanWords.join('');

	quoteElement.childNodes[0].className = 'highlight';

	messageElement.innerText = '';

	typedValueElement.value = '';

	typedValueElement.focus();

	startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', function type() {

	const currentWord = words[wordIndex];


	const typedValue = typedValueElement.value;

	if (typedValue === currentWord && wordIndex === words.length - 1) {
		//end of the quote.Display success
		const elapsedTime = new Date().getTime() - startTime;
		const message = `<strong>CONGRATS!</strong> You finished in <strong>${elapsedTime/1000}</strong> seconds.`;
		messageElement.innerHTML = message;
		//disable text on completion.
		document.getElementById('typed-value').disabled = true
		//event listening disabled on success.

	} else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
		//end of the word
		//clear the typedValueElement for the new word
		typedValueElement.value = '';
		//move to next word
		wordIndex++;

		//reset class name of all quote elements
		for (const wordElement of quoteElement.childNodes) {
			wordElement.className = '';
		}
		//highlight the new word
		quoteElement.childNodes[wordIndex].className = 'highlight';
	} else if (currentWord.startsWith(typedValue)) {
		//currently correct
		typedValueElement.className = '';
	} else {
		//error state
		typedValueElement.className = 'error';
	}
});