const fs = require('fs');

/**
 * Consume dictionary.txt and convert it to a json string array.
 * Output the result to words.json
 * 
 * words.json is sent to the POST words.json endpoint to add all English words to the Api's corpus.
 */

const dictionary = fs.readFileSync('dictionary.txt', 'utf8');

const words = JSON.stringify({ words: dictionary.split('\r\n') });

fs.writeFileSync('words.json', words);